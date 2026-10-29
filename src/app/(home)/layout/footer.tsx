import Link from "next/link";

export const Footer = () => (
    <footer id="contact" className="site-footer"><div className="footer-main"><div><div className="footer-kicker">HAVE SOMETHING IN MIND?</div><h2>Let’s make<br /><em>something good.</em></h2><a href="mailto:nominori999@gmail.com" className="footer-email">nominori999@gmail.com ↗</a></div><div className="footer-links"><span>FIND ME ELSEWHERE</span><Link href="https://github.com/nominori-dev">GitHub ↗</Link><Link href="https://www.linkedin.com/in/nominori/">LinkedIn ↗</Link></div></div><div className="footer-bottom"><span>© {new Date().getFullYear()} ANTONII SHYMCHYTS</span><span>NO ANALYTICS OR DATA COLLECTION CONFIGURED</span><a href="#top">BACK TO TOP ↑</a></div></footer>
);
