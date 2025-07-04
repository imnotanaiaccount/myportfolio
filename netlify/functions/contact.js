exports.handler = async (event, context) => {
  // Enable CORS
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
      body: JSON.stringify({ message: 'Method not allowed' })
    };
  }

  try {
    // Parse the request body
    const formData = JSON.parse(event.body);

    // Validate required fields
    const requiredFields = ['firstName', 'lastName', 'email'];
    for (const field of requiredFields) {
      if (!formData[field] || !formData[field].trim()) {
        return {
          statusCode: 400,
          headers,
          body: JSON.stringify({ 
            message: `Missing required field: ${field}` 
          })
        };
      }
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ 
          message: 'Invalid email format' 
        })
      };
    }

    // Prepare data for n8n webhook
    const webhookData = {
      firstName: formData.firstName.trim(),
      lastName: formData.lastName.trim(),
      email: formData.email.trim(),
      phone: formData.phone || '',
      company: formData.company || '',
      projectType: formData.projectType || '',
      budget: formData.budget || '',
      description: formData.description || '',
      timestamp: new Date().toISOString(),
      source: 'Portfolio Contact Form'
    };

    // Send to n8n webhook if configured
    let n8nResponse = null;
    if (process.env.N8N_WEBHOOK_URL) {
      try {
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

    // Send email via Brevo if configured
    let brevoResponse = null;
    if (process.env.BREVO_API_KEY) {
      try {
        // Create a simple HTML email without using templates
        const emailHtml = `
          <!DOCTYPE html>
          <html>
          <head>
            <meta charset="utf-8">
            <title>New Contact Form Submission</title>
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background: #1877f2; color: white; padding: 20px; text-align: center; }
              .content { padding: 20px; background: #f9f9f9; }
              .field { margin-bottom: 15px; }
              .label { font-weight: bold; color: #1877f2; }
              .value { background: white; padding: 10px; border-radius: 5px; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>🎉 New Contact Form Submission</h1>
              </div>
              <div class="content">
                <div class="field">
                  <div class="label">👤 Name:</div>
                  <div class="value">${webhookData.firstName} ${webhookData.lastName}</div>
                </div>
                <div class="field">
                  <div class="label">📧 Email:</div>
                  <div class="value">${webhookData.email}</div>
                </div>
                <div class="field">
                  <div class="label">📞 Phone:</div>
                  <div class="value">${webhookData.phone || 'Not provided'}</div>
                </div>
                <div class="field">
                  <div class="label">🏢 Company:</div>
                  <div class="value">${webhookData.company || 'Not provided'}</div>
                </div>
                <div class="field">
                  <div class="label">🛠️ Project Type:</div>
                  <div class="value">${webhookData.projectType || 'Not specified'}</div>
                </div>
                <div class="field">
                  <div class="label">💰 Budget:</div>
                  <div class="value">${webhookData.budget || 'Not specified'}</div>
                </div>
                <div class="field">
                  <div class="label">💬 Message:</div>
                  <div class="value">${webhookData.description || 'No message provided'}</div>
                </div>
                <div class="field">
                  <div class="label">⏰ Submitted:</div>
                  <div class="value">${webhookData.timestamp}</div>
                </div>
              </div>
            </div>
          </body>
          </html>
        `;

        const brevoEmailData = {
          sender: {
            name: 'Portfolio Contact Form',
            email: 'contact@brevo.com'
          },
          to: [{
            email: process.env.NOTIFICATION_EMAIL || 'joshhawleyproductions@gmail.com',
            name: 'Portfolio Contact'
          }],
          subject: `New Contact Form Submission - ${webhookData.firstName} ${webhookData.lastName}`,
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

    // Return success response
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        message: 'Thank you for your message! We\'ll get back to you soon.',
        success: true,
        n8nStatus: n8nResponse?.status,
        brevoStatus: brevoResponse?.ok ? 'sent' : 'not_configured'
      })
    };

  } catch (error) {
    console.error('Contact form error:', error);
    
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        message: 'An error occurred while processing your request. Please try again later.',
        error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
      })
    };
  }
}; 