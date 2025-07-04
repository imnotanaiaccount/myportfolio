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
        const brevoEmailData = {
          sender: {
            name: 'Portfolio Contact Form',
            email: process.env.BREVO_SENDER_EMAIL || 'noreply@yourdomain.com'
          },
          to: [{
            email: process.env.NOTIFICATION_EMAIL || 'your-email@example.com',
            name: 'Portfolio Contact'
          }],
          templateId: parseInt(process.env.BREVO_TEMPLATE_ID || '1'),
          params: {
            firstName: webhookData.firstName,
            lastName: webhookData.lastName,
            email: webhookData.email,
            phone: webhookData.phone,
            company: webhookData.company,
            projectType: webhookData.projectType,
            budget: webhookData.budget,
            message: webhookData.description,
            timestamp: webhookData.timestamp
          }
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