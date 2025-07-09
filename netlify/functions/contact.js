const { createClient } = require('@supabase/supabase-js');

// Initialize Supabase client with error handling
let supabase = null;
try {
  supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_ANON_KEY
  );
} catch (error) {
  console.error('Supabase client initialization error:', error);
}

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
    // Log environment variables for debugging (remove in production)
    console.log('Environment check:', {
      hasSupabaseUrl: !!process.env.SUPABASE_URL,
      hasSupabaseKey: !!process.env.SUPABASE_ANON_KEY,
      hasBrevoKey: !!process.env.BREVO_API_KEY
    });

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

    // Save to Supabase (if configured)
    let supabaseSuccess = false;
    if (supabase && process.env.SUPABASE_URL && process.env.SUPABASE_ANON_KEY) {
      try {
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
        } else {
          supabaseSuccess = true;
          console.log('Lead saved to Supabase successfully');
        }
      } catch (error) {
        console.error('Supabase save error:', error);
      }
    } else {
      console.log('Supabase not configured, skipping database save');
    }

    // Send email via Brevo (if configured)
    let brevoSuccess = false;
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
            email: process.env.BREVO_SENDER_EMAIL || 'joshhawleyofficial@gmail.com'
          },
          to: [{
            email: process.env.NOTIFICATION_EMAIL || 'hello@riva.com',
            name: 'Riva Team'
          }],
          subject: `New Lead: ${name} - ${projectType}`,
          htmlContent: emailHtml
        };

        const brevoResponse = await fetch('https://api.brevo.com/v3/smtp/email', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'api-key': process.env.BREVO_API_KEY
          },
          body: JSON.stringify(brevoEmailData)
        });

        if (brevoResponse.ok) {
          brevoSuccess = true;
          console.log('Email sent via Brevo successfully');
        } else {
          const errorText = await brevoResponse.text();
          console.error('Brevo API error:', brevoResponse.status, errorText);
        }
      } catch (error) {
        console.error('Brevo email error:', error);
      }
    } else {
      console.log('Brevo not configured, skipping email');
    }

    // Always return success if form data is valid
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ 
        message: 'Thank you! Your message has been received.',
        success: true,
        supabaseStatus: supabaseSuccess ? 'saved' : 'not_configured',
        brevoStatus: brevoSuccess ? 'sent' : 'not_configured'
      })
    };

  } catch (error) {
    console.error('Function error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ 
        error: 'Internal server error',
        message: 'Something went wrong. Please try again later.'
      })
    };
  }
}; 