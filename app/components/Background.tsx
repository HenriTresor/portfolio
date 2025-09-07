export default function Background() {
    return (
        <div aria-hidden className="fixed inset-0 -z-10 overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(1200px_600px_at_80%_-10%,rgba(154,199,255,0.12),transparent_60%)]" />
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.04),rgba(255,255,255,0.04))] [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_70%)]" />
            <div className="aurora absolute -inset-1 opacity-70" />
        </div>
    );
}


