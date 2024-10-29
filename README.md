# Launch Base - SaaS Starter Template

A modern SaaS starter template built with Next.js 13+, Appwrite, Stripe, and more. Get your SaaS project up and running in minutes!

## 🚀 Features

- 🔐 Authentication with Appwrite
- 💳 Payment processing with Stripe
- 📧 Email system with Mailgun
- 🌓 Dark mode support
- 📱 Responsive design
- 🎨 Modern UI with Tailwind CSS

## 🛠️ Prerequisites

Before you begin, ensure you have:
- Node.js 16+ installed
- An Appwrite account
- A Stripe account
- A Mailgun account

## 🏁 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/launch-base.git
cd launch-base
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Appwrite

1. Create an Appwrite account at [cloud.appwrite.io](https://cloud.appwrite.io)
2. Create a new project in Appwrite
3. Go to your project settings and note down:
   - Project ID
   - API Endpoint
   - API Key (create a new API key with all permissions)

### 4. Set Up the Database

Run the Appwrite setup script to create all necessary collections:

```bash
node appwrite-scripts/setup.js
```

When prompted, enter your:
- Project ID
- API Key

This will create:
- Users collection
- Subscriptions collection
- Payments collection

### 5. Configure Environment Variables

1. Copy the example environment file:
```bash
cp .env.example .env.local
```

2. Fill in your environment variables:
```env
# Appwrite
NEXT_PUBLIC_APPWRITE_ENDPOINT=your_appwrite_endpoint
NEXT_PUBLIC_APPWRITE_PROJECT_ID=your_project_id
NEXT_PUBLIC_APPWRITE_DATABASE_ID=your_database_id

# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
STRIPE_SECRET_KEY=your_stripe_secret_key

# Mailgun
MAILGUN_API_KEY=your_mailgun_key
MAILGUN_DOMAIN=your_domain

# App URL
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 6. Start the Development Server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to see your app!

## 🗺️ Project Structure

```
launch-base/
├── app/                    # Next.js 13+ app directory
│   ├── page.js            # Home page
│   ├── login/             # Authentication pages
│   ├── dashboard/         # User dashboard
│   └── account/           # User account management
├── components/            # Reusable components
├── lib/                   # Utility functions and configs
└── appwrite-scripts/      # Database setup scripts
```

## 📝 Project Flow

1. **Home Page (`/`):**
   - Landing page with feature showcase
   - Links to pricing and authentication

2. **Authentication:**
   - Sign up (`/signup`)
   - Login (`/login`)
   - Password reset (`/forgot-password`)

3. **User Flow:**
   - After signup/login, users are redirected to dashboard
   - Users can view/update their profile in account page
   - Subscribe to plans through the pricing page

4. **Subscription Flow:**
   - Choose a plan from pricing page
   - Complete payment through Stripe
   - Access premium features based on subscription

## 🛠️ Customization

### Adding New Features

1. Create new pages in the `app` directory
2. Add new components in `components` directory
3. Update navigation in `components/Header.js`

### Styling

- Uses Tailwind CSS for styling
- Customize theme in `tailwind.config.js`
- Global styles in `app/globals.css`

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- Appwrite for the backend solution
- Stripe for payment processing
- All other open-source contributors

## 🆘 Need Help?

- Check out the [Discussions](https://github.com/yourusername/launch-base/discussions) tab
- Open an [Issue](https://github.com/yourusername/launch-base/issues)
- Read the [Wiki](https://github.com/yourusername/launch-base/wiki)

---

Built with ❤️ using Next.js and Appwrite
