import { useState } from "react";
import Accordion from "../components/ui/accordion";
import MultiSelectDropdown from "../components/ui/multiselect";

const AccordionPage = () => {
  // const [activeIndex, setActiveIndex] = useState<number[]>([0]); multi mopen accordion
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [selectedItem, setSelectedItem] = useState<string[]>([]);

  const accordionData = [
    {
      title: "What is this application about?",
      description:
        "This application helps users manage their tasks efficiently with a simple and intuitive interface, ensuring better productivity and organization.",
    },
    {
      title: "How do I create an account?",
      description:
        "You can create an account by signing up with your email address and setting a secure password. Follow the on-screen instructions to complete registration.",
    },
    {
      title: "How can I reset my password?",
      description:
        "If you forgot your password, click on the 'Forgot Password' option on the login page and follow the steps to reset it securely.",
    },
    {
      title: "Is my data secure?",
      description:
        "Yes, we prioritize your privacy and security. All your data is encrypted and stored safely using modern security standards.",
    },
    {
      title: "Can I access this on mobile devices?",
      description:
        "Absolutely! The application is fully responsive and works seamlessly across desktops, tablets, and mobile devices.",
    },
    {
      title: "How can I contact support?",
      description:
        "If you face any issues or have questions, you can reach out to our support team via the contact form or email provided in the app.",
    },
  ];
  const options = [
    { label: "Apple", value: "apple" },
    { label: "Banana", value: "banana" },
    { label: "Orange", value: "orange" },
    { label: "Mango", value: "mango" },
    { label: "Pineapple", value: "pineapple" },
    { label: "Grapes", value: "grapes" },
  ];
  return (
    <div className="bg-gray-950 h-screen overflow-y-auto p-3">
      {accordionData?.map((a, index) => (
        <Accordion
          key={a?.description}
          title={a?.title}
          isOpen={activeIndex === index}
          // onChange={() =>
          //   setActiveIndex((prev) =>
          //     prev?.includes(index)
          //       ? prev.filter((p) => p !== index)
          //       : [...prev, index]
          //   )
          // }multi open accordion
          onChange={() =>
            setActiveIndex((prev) => (prev === index ? -1 : index))
          }
        >
          <p className="text-sm text-white py-2">{a?.description}</p>
        </Accordion>
      ))}
      <MultiSelectDropdown
        value={selectedItem}
        setSelectedItem={setSelectedItem}
        options={options}
      />
    </div>
  );
};

export default AccordionPage;
