import React from "react";
import { SubHeading, Content } from "../../components/Design/Typography";
import PolicyLayout from "../../components/Layout/PolicyLayout/PolicyLayout";
const DamagePolicy = () => {
  return (
    <PolicyLayout pageTitle="Damage Policy" style={{ width: "1248px" }}>
      <div class="text-sm">
        <Content>
          Thank you for using our peer-to-peer application. This Damage Policy
          outlines the terms and conditions related to damages that may occur
          during rental transactions. By using our platform, you agree to comply
          with this policy. Please read it carefully before engaging in any
          rental transactions.
        </Content>

        <SubHeading>1. Damage Responsibility</SubHeading>
        <Content>
          1.1 Damage Liability: Users engaging in rental transactions are
          responsible for any damages that occur during the rental period,
          unless otherwise stated in a separate agreement. Examples: This
          includes damages resulting from negligence, misuse, or accidental
          occurrences during the rental period.
        </Content>
        <Content>
          1.2 Reporting Damages: Users must promptly report any damages to the
          other party, providing detailed information and supporting evidence.It
          is essential to provide detailed information and supporting evidence,
          such as photographs or videos, to accurately document the extent of
          the damages.
        </Content>

        <SubHeading>2. Security Deposits</SubHeading>
        <Content>
          2.1 Security Deposit: Users may choose to implement a security deposit
          system to cover potential damages. The amount and terms of the
          security deposit should be clearly stated in the rental agreement.
        </Content>
        <Content>
          2.2 Deductions from Security Deposit: If damages occur, the cost of
          repairs or compensation may be deducted from the security deposit.
          Users should provide documentation and justification for any
          deductions.
        </Content>

        <SubHeading>3. Dispute Resolution</SubHeading>
        <Content>
          3.1 Mediation and Arbitration: In the event of disputes regarding
          damages, users agree to attempt mediation or arbitration to reach a
          fair resolution. Both parties should cooperate in good faith
          throughout the process.
        </Content>
        <Content>
          3.2 Legal Recourse: If mediation or arbitration does not lead to a
          resolution, users may seek legal recourse as per the applicable laws
          and jurisdiction.
        </Content>

        <SubHeading>4. Prohibited Activities</SubHeading>
        <Content>
          4.1 Fraudulent Claims: Users are strictly prohibited from making
          fraudulent claims or intentionally causing damages to benefit
          financially or otherwise.
        </Content>
        <Content>
          4.2 Violation of Terms: Users found in violation of the terms of the
          damage policy may face account suspension, termination, or legal
          consequences.
        </Content>

        <Content>
          This Damage Policy aims to foster a culture of fairness and
          accountability among users of our platform. By using our services, you
          acknowledge and agree to abide by the terms and conditions outlined in
          this policy.
        </Content>
        <Content>
          If you have any questions or require further clarification regarding
          the Damage Policy, please do not hesitate to reach out to our
          dedicated customer support team. We are here to assist you and ensure
          a seamless rental experience for all users.
        </Content>
      </div>
    </PolicyLayout>
  );
};

export default DamagePolicy;
