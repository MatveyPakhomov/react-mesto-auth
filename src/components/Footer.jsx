import React from "react";

export default function Footer() {
  //вот это ПРИКОЛ! спасибо =)
  const currentYear = new Date().getFullYear()

  return (
    <footer className="footer">
      <p className="footer__title">&copy; {currentYear} Mesto Russia</p>
    </footer>
  );
}
