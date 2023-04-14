const Footer = () => {
  return (
    <section className="footer white" style={{ paddingLeft: "16%" }}>
      <ul className="links ">
        <li>
          <a href="/page/serviceagreement">서비스 이용약관</a>
        </li>
        <li className="privacy">
          <a href="/page/rules">커뮤니티 이용규칙</a>
        </li>

        <li>
          <a href="/page/privacy">개인정보처리방침</a>
        </li>
        <li>
          <a href="/page/youthpolicy">청소년 보호정책</a>
        </li>
        <li>
          <p>문의: capstone23m@gmail.com</p>
        </li>
        <li className="copyright">
          <a href="/">© 에브리 한성</a>
        </li>
      </ul>
    </section>
  );
};

export default Footer;
