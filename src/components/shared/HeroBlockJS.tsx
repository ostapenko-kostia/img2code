import Image from "next/image";

const HeroBlockJS = () => {
    return (
        <div className="flex items-center gap-4">
            <Image src='/static/images/js.png' width={48} height={48} alt='Javascript' className="rounded-md" />
            <p className="font-bold text-lg">console.log{"("}<span className="text-green-600">{'"'}Converts image to code{'"'}</span>{")"};</p>
        </div>
    );
}

export default HeroBlockJS;