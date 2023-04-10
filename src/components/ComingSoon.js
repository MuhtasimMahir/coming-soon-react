import Counter from './Counter';
import NewsletterSubscriptionForm from './SubscriptionForm';
//

export function comingSoon() {
  return (
    <div className="size1 overlay1">
      <div className="size1 flex-col-c-m p-l-15 p-r-15 p-t-50 p-b-50">
        <h3 className="l1-txt1 txt-center p-b-25">
          Coming Soon
        </h3>

        <p className="m2-txt1 txt-center p-b-48">
          Our website is under construction, follow us for update now!
        </p>

        <Counter />

        <NewsletterSubscriptionForm apiUrl="http://103.108.146.90:5000/sendemail" />
      </div>
    </div>
  );
}

export default comingSoon;