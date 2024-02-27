import React from "react";
import { SubHeading, Content } from "../../components/Design/Typography";
import PolicyLayout from "../../components/Layout/PolicyLayout/PolicyLayout";

const PrivacyPolicy = () => {
  return (
    <PolicyLayout pageTitle="Privacy Policy">
      <SubHeading>Effective Date: [Date]</SubHeading>

      <Content>
        This Privacy Policy governs the manner in which Rentivity ("we," "us,"
        or "our") collects, uses, maintains, and discloses information collected
        from users ("User" or "you") of the Rentivity web application
        ("Application"). This Privacy Policy applies to the Application and all
        products and services offered by Rentivity.
      </Content>

      <SubHeading>1. Welcome to Fat Llama</SubHeading>

      <Content>
        We may collect personal identification information from Users in various
        ways, including, but not limited to, when Users visit our Application,
        register on the Application, place an order, subscribe to the
        newsletter, respond to a survey, fill out a form, and in connection with
        other activities, services, features, or resources we make available on
        our Application. Users may be asked for their name, email address,
        mailing address, phone number, and other relevant information.
      </Content>

      <Content>
        We may also collect non-personal identification information about Users
        whenever they interact with our Application. Non-personal identification
        information may include the browser name, the type of computer or device
        used, technical information about Users' means of connection to our
        Application, such as the operating system and the Internet service
        providers utilized, and other similar information.
      </Content>

      <SubHeading>How We Use Collected Information</SubHeading>

      <Content>
        We collect and use Users' personal information for the following
        purposes:
      </Content>

      <ul class="list-disc ml-6">
        <li>
          To provide and improve our services: Information you provide helps us
          deliver and enhance the functionality and features of our Application.
        </li>
        <li>
          To personalize user experience: We may use information in the
          aggregate to understand how our Users as a group use the services and
          resources provided on our Application.
        </li>
        <li>
          To process transactions: We may use the information Users provide
          about themselves when placing an order only to provide service to that
          order. We do not share this information with outside parties except to
          the extent necessary to provide the service.
        </li>
        <li>
          To send periodic emails: We may use the email address to send User
          information and updates pertaining to their order. It may also be used
          to respond to their inquiries, questions, and/or other requests. If
          User decides to opt-in to our mailing list, they will receive emails
          that may include company news, updates, related product or service
          information, etc. If at any time the User would like to unsubscribe
          from receiving future emails, we include detailed unsubscribe
          instructions at the bottom of each email.
        </li>
        <li>
          To improve customer service: Information you provide helps us respond
          to your customer service requests and support needs more efficiently.
        </li>
        <li>
          To administer content, promotions, surveys, or other Application
          features.
        </li>
      </ul>

      <SubHeading>How We Protect Your Information</SubHeading>

      <Content>
        We adopt appropriate data collection, storage, and processing practices
        and security measures to protect against unauthorized access,
        alteration, disclosure, or destruction of your personal information,
        username, password, transaction information, and data stored on our
        Application.
      </Content>

      <Content>
        Sensitive and private data exchange between the Application and its
        Users happens over a Secure Socket Layer (SSL) secured communication
        channel and is encrypted and protected with digital signatures. Our
        Application is also in compliance with PCI vulnerability standards to
        create as secure of an environment as possible for Users.
      </Content>

      <SubHeading>Sharing Your Personal Information</SubHeading>

      <Content>
        We do not sell, trade, or rent Users' personal identification
        information to others. We may share generic aggregated demographic
        information not linked to any personal identification information
        regarding visitors and users with our business partners, trusted
        affiliates, and advertisers for the purposes outlined above.
      </Content>

      <Content>
        We may use third-party service providers to help us operate our business
        and the Application or administer activities on our behalf, such as
        sending out newsletters or surveys. We may share your information with
        these third parties for those limited purposes, provided that you have
        given us your permission.
      </Content>

      <SubHeading>Compliance with Applicable Laws</SubHeading>

      <Content>
        We will disclose your personal information where required to do so by
        law or subpoena or if we believe that such action is necessary to comply
        with the law and the reasonable requests of law enforcement or to
        protect the security or integrity of our Application.
      </Content>

      <SubHeading>Changes to This Privacy Policy</SubHeading>

      <Content>
        Rentivity has the discretion to update this Privacy Policy at any time.
        When we do, we will revise the updated date at the bottom of this page.
        We encourage Users to frequently check this page for any changes to stay
        informed about how we are helping to protect the personal information we
        collect. You acknowledge and agree that it is your responsibility to
        review this Privacy Policy periodically and become aware of
        modifications.
      </Content>

      <SubHeading>Your Acceptance of These Terms</SubHeading>

      <Content>
        By using this Application, you signify your acceptance of this Privacy
        Policy. If you do not agree to this Privacy Policy, please do not use
        our Application. Your continued use of the Application following the
        posting of changes to this Privacy Policy will be deemed your acceptance
        of those changes.
      </Content>

      <SubHeading>Contacting Us</SubHeading>

      <Content>
        If you have any questions about this Privacy Policy, the practices of
        this Application, or your dealings with this Application, please contact
        us at:
      </Content>

      <Content class="my-3">
        Rentivity <br />
        Daiict,Gandhinagar
        <br />
        382007
        <br />
        support@Rentivity.in
      </Content>

      <Content>This Privacy Policy was last updated on [Date].</Content>
    </PolicyLayout>
  );
};

export default PrivacyPolicy;
