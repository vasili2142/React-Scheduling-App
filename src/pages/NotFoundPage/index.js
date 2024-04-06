import PageContainer from "../../components/PageContainer";
import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <PageContainer title="Page Not Found">
      <p>Please check the address.</p>
      <ul>
        <li>
          <Link to="/">Click Here</Link> to go back.
        </li>
      </ul>
    </PageContainer>
  );
}
