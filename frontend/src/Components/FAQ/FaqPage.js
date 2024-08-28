import React, { useEffect, useState } from "react";
import { ScrollEffect } from "react-easy-scroll-effect";
import Faq from "react-faq-component";

const data = {
    title: "Frequently Asked Questions",
    rows: [
      {
        title: "How do I book a hotel room?",
        content: "To book a hotel room, use our search feature to find available hotels, select your preferred option, and follow the booking instructions.",
      },
      {
        title: "What payment methods are accepted?",
        content: "We accept various payment methods including credit cards, debit cards, and UPI payments.",
      },
      {
        title: "Can I cancel my booking?",
        content: "Yes, you can cancel your booking by visiting your account dashboard and selecting the booking you wish to cancel. Please check our cancellation policy for details.",
      },
      {
        title: "How can I contact customer support?",
        content: "You can contact our customer support team via email at abhishek@hotellight.com or call us at +91 080178789317.",
      },
    ],
  };
  

const styles = {
    bgColor: 'rgb(15 23 42)',
    titleTextColor: "white",
    rowTitleColor: "white",
    rowContentColor: 'white',
    arrowColor: "white",
};

const config = {
    animate: true,
    arrowIcon: "^",
    tabFocus: true
};

const FaqPage = () => {

    return (
        <ScrollEffect>
        <div className="mt-5 mb-5">
            <Faq
                data={data}
                styles={styles}
                config={config}
            />
            </div>
        </ScrollEffect>
    );
}
export default FaqPage;