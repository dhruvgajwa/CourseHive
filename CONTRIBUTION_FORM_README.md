# Contribution Homepage Guide

This contribution form (`contribution-form.html`) provides a user-friendly interface for collecting feedback, feature requests, bug reports, and contribution inquiries for the CourseHive project.

## Features

- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Modern UI**: Clean, gradient-based design with smooth interactions
- **Multiple Request Types**:
  - Code Contributions
  - Feature Requests
  - Bug Reports
  - General Feedback
  - Documentation Improvements
  - Other

- **Form Validation**: Client-side validation ensures all required fields are completed
- **Email Integration**: Automatically formats and sends messages via the user's email client

## How to Use

1. Open `contribution-form.html` in any modern web browser
2. Fill in your details:
   - Full Name
   - Email Address
   - Type of Request
   - Detailed Message
3. Click "Send Message" to submit
4. Your email client will open with a pre-formatted message
5. Review and send the email to complete the submission

## Integration

To integrate this form into your project:

1. Place `contribution-form.html` in your project root or web directory
2. Link to it from your README or project website
3. Customize the recipient email address in the JavaScript (currently set to `dhruvgajwa@example.com`)

## Customization

You can customize the following:

- **Email Address**: Update the `mailtoLink` in the JavaScript section to your preferred email
- **Gradient Colors**: Modify the CSS gradient values (currently `#667eea` to `#764ba2`)
- **Form Fields**: Add or remove request types in the select dropdown
- **Contact Information**: Update links and references to your GitHub repository

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers

## Future Enhancements

Consider adding:
- Backend email service integration (e.g., Firebase, SendGrid)
- Form submission tracking
- Automated responses to users
- GitHub Issues auto-creation
