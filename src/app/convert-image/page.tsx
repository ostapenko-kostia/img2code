import { Container } from "@/components/shared/Container";
import ExtractCodeForm from "@/components/shared/ExtractCodeForm";

export default function ConvertImage() {
    return (
        <section className="pb-24">
            <Container>
                <h2 className="text-center font-bold text-4xl my-8 max-xs:text-3xl max-[350px]:text-2xl">
                    Convert Image to
                    <span className="font-black bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
                        &nbsp;Code
                    </span>
                </h2>
                <ExtractCodeForm />
            </Container>
        </section>
    );
}
