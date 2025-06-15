import React from 'react';

const PrivacyPolicy = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 text-gray-800">
      <h1 className="text-4xl font-bold mb-6 text-blue-900">Privacy Policy</h1>

      <p className="mb-4">
        At <strong>BookNest</strong>, we value your privacy and are committed to protecting your personal information. This Privacy Policy explains how we collect, use, and safeguard your data.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">1. Information We Collect</h2>
      <ul className="list-disc ml-6 mb-4">
        <li><strong>Personal Information:</strong> such as your name, email address, and phone number when you register or contact us.</li>
        <li><strong>Usage Data:</strong> such as pages visited, time spent on pages, and browser details.</li>
        <li><strong>Cookies:</strong> to enhance your experience on our platform.</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-6 mb-2">2. How We Use Your Information</h2>
      <p className="mb-4">
        We use the information we collect to:
      </p>
      <ul className="list-disc ml-6 mb-4">
        <li>Provide and improve our services</li>
        <li>Communicate with you</li>
        <li>Personalize user experience</li>
        <li>Monitor and analyze usage and trends</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-6 mb-2">3. Data Security</h2>
      <p className="mb-4">
        We implement a variety of security measures to protect your personal information, including encryption, secure servers, and limited access controls.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">4. Third-Party Sharing</h2>
      <p className="mb-4">
        We do not sell, trade, or rent your personal information to third parties. We may share information with service providers who help us operate our app, under strict confidentiality agreements.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">5. Your Choices</h2>
      <p className="mb-4">
        You can choose to disable cookies through your browser settings. You can also contact us to review or delete your personal information.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">6. Changes to This Policy</h2>
      <p className="mb-4">
        We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated revision date.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">7. Contact Us</h2>
      <p>
        If you have any questions about this Privacy Policy, please contact us at:
        <br />
        📧 <a href="mailto:support@booknest.com" className="text-blue-600 underline">support@booknest.com</a>
      </p>
    </div>
  );
};

export default PrivacyPolicy;
