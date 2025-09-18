import Link from "next/link";
import {Button} from "@/components/ui/button";

export const Footer = () => {
    return (
        <footer id="contact" className="mt-24 py-16 text-center opacity-85">
            <div className="max-w-2xl mx-auto">
                <h5 className="font-serif text-2xl mb-4">Get in touch</h5>
                <p className="mb-6 opacity-80">I am open to backend projects, frontend collaborations, and full-stack contracts.</p>
                <Link href="mailto:nominori999@gmail.com">
                    <Button variant={"outline"}>Email me</Button>
                </Link>
            </div>
        </footer>
    )
}