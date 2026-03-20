'use client';

export default function ContactButton() {
  return (
    <a
      href="#"
      onClick={(e) => {
        e.preventDefault();
        window.location.href = 'mai' + 'lto:hanamanajun' + '@gmail.com';
      }}
      className="about-contact-btn"
    >
      ✉️ メールを送る
    </a>
  );
}
