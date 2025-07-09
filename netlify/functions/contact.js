const { createClient } = require('@supabase/supabase-js');

// Initialize Supabase client
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

exports.handler = async (event, context) => {
  // Enable CORS for Netlify
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS'
  };

  // Handle preflight requests
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: ''
    };
  }

  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    const { name, email, projectType, message, newsletter } = JSON.parse(event.body);

    // Validate required fields
    if (!name || !email || !projectType || !message) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Missing required fields' })
      };
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Invalid email format' })
      };
    }

    // Save to Supabase (free tier: 50,000 rows)
    const { error: supabaseError } = await supabase
      .from('leads')
      .insert([
        {
          name: name.trim(),
          email: email.toLowerCase().trim(),
          project_type: projectType,
          message: message.trim(),
          newsletter: !!newsletter,
          created_at: new Date().toISOString()
        }
      ]);

    if (supabaseError) {
      console.error('Supabase error:', supabaseError);
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ error: 'Failed to save lead' })
      };
    }

    // Send to n8n webhook (FREE tier: 1,000 executions/month)
    let n8nResponse = null;
    if (process.env.N8N_WEBHOOK_URL) {
      try {
        const webhookData = {
          name: name.trim(),
          email: email.toLowerCase().trim(),
          projectType: projectType,
          message: message.trim(),
          newsletter: !!newsletter,
          timestamp: new Date().toISOString(),
          source: 'Riva Portfolio Contact Form'
        };

        n8nResponse = await fetch(process.env.N8N_WEBHOOK_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(webhookData)
        });
      } catch (error) {
        console.error('n8n webhook error:', error);
        // Don't fail the entire request if n8n is down
      }
    }

    // Send email via Brevo (FREE tier: 300 emails/day)
    let brevoResponse = null;
    if (process.env.BREVO_API_KEY) {
      try {
        const emailHtml = `
          <!DOCTYPE html>
          <html>
          <head>
            <meta charset="utf-8">
            <title>New Contact Form Submission - Riva</title>
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background: #007AFF; color: white; padding: 20px; text-align: center; }
              .content { padding: 20px; background: #f9f9f9; }
              .field { margin-bottom: 15px; }
              .label { font-weight: bold; color: #007AFF; }
              .value { background: white; padding: 10px; border-radius: 5px; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>🎉 New Lead from Riva Portfolio</h1>
              </div>
              <div class="content">
                <div class="field">
                  <div class="label">👤 Name:</div>
                  <div class="value">${name}</div>
                </div>
                <div class="field">
                  <div class="label">📧 Email:</div>
                  <div class="value">${email}</div>
                </div>
                <div class="field">
                  <div class="label">🛠️ Project Type:</div>
                  <div class="value">${projectType}</div>
                </div>
                <div class="field">
                  <div class="label">💬 Message:</div>
                  <div class="value">${message}</div>
                </div>
                <div class="field">
                  <div class="label">📧 Newsletter:</div>
                  <div class="value">${newsletter ? 'Yes' : 'No'}</div>
                </div>
                <div class="field">
                  <div class="label">⏰ Submitted:</div>
                  <div class="value">${new Date().toLocaleString()}</div>
                </div>
              </div>
            </div>
          </body>
          </html>
        `;

        const brevoEmailData = {
          sender: {
            name: 'Riva Portfolio',
            email: 'noreply@riva.com'
          },
          to: [{
            email: process.env.NOTIFICATION_EMAIL || 'hello@riva.com',
            name: 'Riva Team'
          }],
          subject: `New Lead: ${name} - ${projectType}`,
          htmlContent: emailHtml
        };

        brevoResponse = await fetch('https://api.brevo.com/v3/smtp/email', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'api-key': process.env.BREVO_API_KEY
          },
          body: JSON.stringify(brevoEmailData)
        });

        if (!brevoResponse.ok) {
          const errorText = await brevoResponse.text();
          console.error('Brevo API error:', brevoResponse.status, errorText);
          throw new Error(`Brevo API error: ${brevoResponse.status}`);
        }
      } catch (error) {
        console.error('Brevo email error:', error);
        // Don't fail the entire request if Brevo is down
      }
    }

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ 
        message: 'Thank you! Your message has been received.',
        success: true,
        n8nStatus: n8nResponse?.status,
        brevoStatus: brevoResponse?.ok ? 'sent' : 'not_configured'
      })
    };

  } catch (error) {
    console.error('Function error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Internal server error' })
    };
  }
}; 