"client-only";
const YEAR = new Date().getFullYear();

export default function Footer() {
    return (
        <small style={{ display: "block", marginTop: "8rem" }}>
            <time>{YEAR}</time> © Your Name.
        </small>
    );
}
