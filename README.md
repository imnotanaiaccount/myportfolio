# Joshua Hawley - Portfolio Website

A modern, responsive portfolio website built with Next.js, Tailwind CSS, and Framer Motion. Features a comprehensive showcase of services, projects, and contact form integration with n8n automation.

## 🚀 Features

- **Modern Design**: Facebook-inspired color palette with dark mode support
- **Responsive Layout**: Optimized for all devices and screen sizes
- **Interactive Animations**: Smooth scroll-triggered animations with Framer Motion
- **Contact Form**: Integrated with Netlify Functions and n8n automation
- **SEO Optimized**: Built with Next.js for optimal performance
- **Professional Content**: Comprehensive service offerings and case studies

## 🛠️ Tech Stack

- **Frontend**: Next.js 14, React 18, Tailwind CSS
- **Animations**: Framer Motion
- **Deployment**: Netlify
- **Automation**: n8n
- **Email**: SendGrid (optional)

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

## 🌐 Netlify Deployment

### Step 1: Prepare for Deployment

1. **Install Netlify CLI** (optional but recommended)
   ```bash
   npm install -g netlify-cli
   ```

2. **Build the project locally**
   ```bash
   npm run build
   ```

### Step 2: Deploy to Netlify

#### Option A: Deploy via Netlify UI (Recommended)

1. **Push your code to GitHub**
   ```bash
   git add .
   git commit -m "Initial portfolio setup"
   git push origin main
   ```

2. **Connect to Netlify**
   - Go to [netlify.com](https://netlify.com)
   - Sign up/Login with your GitHub account
   - Click "New site from Git"
   - Select your repository
   - Configure build settings:
     - **Build command**: `npm run build`
     - **Publish directory**: `.next`
   - Click "Deploy site"

#### Option B: Deploy via Netlify CLI

1. **Login to Netlify**
   ```bash
   netlify login
   ```

2. **Initialize and deploy**
   ```bash
   netlify init
   netlify deploy --prod
   ```

### Step 3: Configure Environment Variables

In your Netlify dashboard, go to **Site settings > Environment variables** and add:

```
N8N_WEBHOOK_URL=https://your-n8n-instance.com/webhook/portfolio-contact
SENDGRID_API_KEY=your_sendgrid_api_key (optional)
NOTIFICATION_EMAIL=your@email.com (optional)
```

## 🔧 n8n Setup

### Step 1: Install n8n

#### Option A: Docker (Recommended)
```bash
docker run -it --rm \
  --name n8n \
  -p 5678:5678 \
  -v ~/.n8n:/home/node/.n8n \
  n8nio/n8n
```

#### Option B: npm
```bash
npm install n8n -g
n8n start
```

### Step 2: Create Contact Form Workflow

1. **Access n8n**
   - Open `http://localhost:5678` in your browser
   - Create an account or login

2. **Create New Workflow**
   - Click "New Workflow"
   - Name it "Portfolio Contact Form"

3. **Add Webhook Trigger**
   - Add "Webhook" node
   - Set HTTP method to "POST"
   - Copy the webhook URL (e.g., `https://your-n8n-instance.com/webhook/portfolio-contact`)

4. **Add Email Node** (Optional)
   - Add "SendGrid" or "Gmail" node
   - Configure your email settings
   - Connect to webhook node

5. **Add CRM Integration** (Optional)
   - Add nodes for your preferred CRM (HubSpot, Salesforce, etc.)
   - Configure lead creation

6. **Add Slack/Discord Notification** (Optional)
   - Add "Slack" or "Discord" node
   - Configure notification settings

### Step 3: Example Workflow

Here's a basic workflow structure:

```
Webhook → Email Notification → CRM Lead Creation → Slack Alert
```

**Webhook Configuration:**
- Method: POST
- Path: `/portfolio-contact`
- Authentication: None (or add if needed)

**Email Node Configuration:**
- Service: SendGrid
- To: Your email
- Subject: `New Portfolio Contact: {{$json.contact.firstName}} {{$json.contact.lastName}}`
- Body: HTML with contact details

## 📧 Email Setup (Optional)

### SendGrid Configuration

1. **Create SendGrid Account**
   - Sign up at [sendgrid.com](https://sendgrid.com)
   - Verify your domain or use single sender verification

2. **Get API Key**
   - Go to Settings > API Keys
   - Create a new API key with "Mail Send" permissions

3. **Add to Netlify Environment Variables**
   ```
   SENDGRID_API_KEY=your_api_key_here
   NOTIFICATION_EMAIL=your@email.com
   ```

## 🔒 Security Considerations

1. **Rate Limiting**: Consider adding rate limiting to your contact form
2. **Spam Protection**: Implement reCAPTCHA or similar protection
3. **Input Validation**: The Netlify function includes basic validation
4. **HTTPS**: Netlify provides SSL certificates automatically

## 📱 Customization

### Update Content

1. **Personal Information**: Update contact details in `components/Contact.js`
2. **Services**: Modify services in `components/Services.js`
3. **Projects**: Update portfolio projects in `components/Examples.js`
4. **Styling**: Customize colors in `tailwind.config.js`

### Add New Features

1. **Blog Section**: Add a blog using MDX
2. **Resume Download**: Add downloadable resume
3. **Social Links**: Add more social media links
4. **Analytics**: Add Google Analytics or Plausible

## 🚀 Performance Optimization

1. **Image Optimization**: Use Next.js Image component
2. **Code Splitting**: Automatic with Next.js
3. **Caching**: Netlify provides CDN caching
4. **Compression**: Automatic with Netlify

## 📊 Analytics Setup

### Google Analytics

1. **Create GA4 Property**
2. **Add tracking code to `pages/_app.js`**:

```javascript
import Script from 'next/script'

export default function App({ Component, pageProps }) {
  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
        `}
      </Script>
      <Component {...pageProps} />
    </>
  )
}
```

3. **Add environment variable**:
   ```
   NEXT_PUBLIC_GA_ID=your_ga_id_here
   ```

## 🐛 Troubleshooting

### Common Issues

1. **Build Fails**
   - Check Node.js version (use 18+)
   - Clear `.next` folder and rebuild
   - Check for missing dependencies

2. **Contact Form Not Working**
   - Verify Netlify function is deployed
   - Check environment variables
   - Test webhook URL in n8n

3. **Styling Issues**
   - Clear browser cache
   - Check Tailwind CSS compilation
   - Verify dark mode toggle

### Debug Commands

```bash
# Clear Next.js cache
rm -rf .next

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install

# Test build locally
npm run build

# Check Netlify function locally
netlify dev
```

## 📞 Support

For issues or questions:
- Check the troubleshooting section above
- Review Netlify and n8n documentation
- Open an issue in the repository

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

**Built with ❤️ by Joshua Hawley** 