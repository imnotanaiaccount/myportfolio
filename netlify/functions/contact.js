const fetch = require('node-fetch');

exports.handler = async (event, context) => {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    // Parse the form data
    const formData = JSON.parse(event.body);
    
    // Validate required fields
    const requiredFields = ['firstName', 'lastName', 'email', 'projectType', 'budget', 'description'];
    const missingFields = requiredFields.filter(field => !formData[field]);
    
    if (missingFields.length > 0) {
      return {
        statusCode: 400,
        body: JSON.stringify({ 
          error: 'Missing required fields', 
          missingFields 
        })
      };
    }

    // Prepare data for n8n webhook
    const webhookData = {
      timestamp: new Date().toISOString(),
      source: 'portfolio-contact-form',
      contact: {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone || '',
        company: formData.company || '',
        projectType: formData.projectType,
        budget: formData.budget,
        description: formData.description
      },
      metadata: {
        userAgent: event.headers['user-agent'],
        ip: event.headers['client-ip'] || event.headers['x-forwarded-for'],
        referer: event.headers.referer
      }
    };

    // Send to n8n webhook (you'll need to replace this URL with your actual n8n webhook URL)
    const n8nWebhookUrl = process.env.N8N_WEBHOOK_URL;
    
    if (n8nWebhookUrl) {
      try {
        const n8nResponse = await fetch(n8nWebhookUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(webhookData)
        });

        if (!n8nResponse.ok) {
          console.error('n8n webhook failed:', n8nResponse.status, n8nResponse.statusText);
        }
      } catch (n8nError) {
        console.error('Error sending to n8n:', n8nError);
        // Don't fail the request if n8n is down
      }
    }

    // Send email notification (optional - you can use a service like SendGrid)
    if (process.env.SENDGRID_API_KEY && process.env.NOTIFICATION_EMAIL) {
      try {
        const emailData = {
          personalizations: [{
            to: [{ email: process.env.NOTIFICATION_EMAIL }],
            subject: `New Portfolio Contact: ${formData.firstName} ${formData.lastName}`
          }],
          from: { email: 'noreply@yourdomain.com' },
          content: [{
            type: 'text/html',
            value: `
              <h2>New Contact Form Submission</h2>
              <p><strong>Name:</strong> ${formData.firstName} ${formData.lastName}</p>
              <p><strong>Email:</strong> ${formData.email}</p>
              <p><strong>Phone:</strong> ${formData.phone || 'Not provided'}</p>
              <p><strong>Company:</strong> ${formData.company || 'Not provided'}</p>
              <p><strong>Project Type:</strong> ${formData.projectType}</p>
              <p><strong>Budget:</strong> ${formData.budget}</p>
              <p><strong>Description:</strong></p>
              <p>${formData.description}</p>
            `
          }]
        };

        await fetch('https://api.sendgrid.com/v3/mail/send', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${process.env.SENDGRID_API_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(emailData)
        });
      } catch (emailError) {
        console.error('Error sending email:', emailError);
      }
    }

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS'
      },
      body: JSON.stringify({ 
        success: true, 
        message: 'Thank you for your message! We\'ll get back to you soon.' 
      })
    };

  } catch (error) {
    console.error('Contact form error:', error);
    
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS'
      },
      body: JSON.stringify({ 
        error: 'Internal server error',
        message: 'Something went wrong. Please try again later.'
      })
    };
  }
}; 