import { useState } from 'react';
import PropTypes from 'prop-types';
import hitToast from '../helpers/hitToast';

const NewsletterSubscriptionForm = ({ apiUrl }) => {
  const [email, setEmail] = useState('');
  const [alertClass, setAlertClass] = useState('');
  const [submitting, setSubmitting] = useState(false);
  

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate(email)) {
      setAlertClass('alert-validate');
      return;
    }

    setSubmitting(true);

    fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email })
    })
      .then(res => {
        if (!res.ok) {
          throw new Error('Server error');
        }
        return res.json();
      })
      .then(data => hitToast(data.success ? 'success' : 'error', data.message))
      .catch(() => hitToast('Something went wrong. Please try again.', 'error'))
      .finally(() => {
        setSubmitting(false);
        setAlertClass('');
      });
    
  }

  const validate = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return email.trim() !== '' && emailRegex.test(email.trim());
  }

  return (
    <form className="w-full flex-w flex-c-m validate-form" onSubmit={handleSubmit}>
      <div className={`wrap-input100 validate-input where1 ${alertClass}`} data-validate="Valid email is required: user@email.domain">
        <input className="input100 placeholder0 s2-txt2" type="text" name="email" placeholder="Enter Email Address" onChange={e => setEmail(e.target.value)} />
        <span className="focus-input100"></span>
      </div>

      <button className="flex-c-m size3 s2-txt3 how-btn1 trans-04 where1" disabled={submitting}>
        {submitting ? 'Submitting...' : 'Subscribe'}
      </button>
    </form>
  );
}

NewsletterSubscriptionForm.propTypes = {
  apiUrl: PropTypes.string.isRequired,
};

export default NewsletterSubscriptionForm;
