import { Navbar } from "@/components/Navbar";

export function Welcome() {
    return (
      <div className="flex-1 w-full flex flex-col gap-20 items-center">
        <Navbar />
        <div className="flex-1 flex flex-col gap-20 max-w-4xl px-3">
          <main className="flex-1 flex flex-col gap-6">
            <h1 className="text-4xl font-bold text-center">
              Welcome to Ürün Radar
            </h1>
            <p className="text-center">
              Ürün Radar is a platform that helps you track the reviews of your
              favorite products. Log in to get started!
            </p>
          </main>
        </div>
      </div>
    );
  }