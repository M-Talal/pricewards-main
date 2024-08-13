const GridLayout = () => {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 grid-rows-4 sm:grid-rows-2 gap-4 p-4">
        <div className="col-span-1 row-span-1 bg-white order-1 sm:order-1">
          <img
            width={375}
            height={419}
            src="https://d1fufvy4xao6k9.cloudfront.net/images/home/hockerty/environment.jpg"
            alt="Image 1"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="col-span-1 row-span-1 flex items-center justify-center bg-white order-2 sm:order-2">
          <div className="max-w-md">
            <h1 className="text-3xl sm:text-5xl font-bold mb-4">Our planet appreciates it</h1>
            <p className="text-base sm:text-lg mb-6">
              Feel great about your clothes and your environmental impact. There’s no waste when you wear one-of-a-kind.
            </p>
            <button className="px-6 py-2 text-black bg-transparent border rounded-full border-black hover:bg-black hover:text-white">
              Learn how its made
            </button>
          </div>
        </div>
        <div className="col-span-1 row-span-1 flex items-center justify-center bg-white order-4 sm:order-3">
          <div className="max-w-md">
            <h1 className="text-3xl sm:text-5xl font-bold mb-4">Looks that last</h1>
            <p className="text-base sm:text-lg mb-6">
              We know you pay attention to detail, and so do we. From durable fabrics to our quality-controlled tailoring process. Get samples of any fabric in our 150+ range, and be assured that your garments are timeless.
            </p>
            <button className="px-6 py-2 text-black bg-transparent border rounded-full border-black hover:bg-black hover:text-white">
              Order Samples
            </button>
          </div>
        </div>
        <div className="col-span-1 row-span-1 bg-white order-3 sm:order-4">
          <img
            src="https://d1fufvy4xao6k9.cloudfront.net/images/home/hockerty/looks-that-last.jpg"
            alt="Image 2"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    );
  };
  
  export default GridLayout;
  