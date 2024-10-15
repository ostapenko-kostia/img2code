import Image from "next/image";

const HeroBlockJava = () => {
    return (
        <div className="flex items-center gap-4 w-auto">
            <Image src='/java.webp' width={48} height={48} alt='Javascript' className="rounded-md" />
            <p className="font-bold text-lg">System.out.println{"("}<span className="text-green-600">{'"'}Converts image to code{'"'}</span>{")"};</p>
        </div>
    );
}

export default HeroBlockJava;