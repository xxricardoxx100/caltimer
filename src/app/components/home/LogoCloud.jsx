export default function LogoCloud() {
  return (
    <div className="bg-white">
      <div className="mx-auto lg:mx-12 max-w-full py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-6 lg:grid-cols-5">
          <div className="col-span-1 flex justify-center md:col-span-2 lg:col-span-1">
            <img
              className="h-12"
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/ee/Toyota_logo_%28Red%29.svg/2560px-Toyota_logo_%28Red%29.svg.png"
              alt="Toyota"
            />
          </div>
          <div className="col-span-1 flex justify-center md:col-span-2 lg:col-span-1">
            <img
              className="h-8"
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Hyundai_Motor_Company_logo.svg/1280px-Hyundai_Motor_Company_logo.svg.png"
              alt="Hyundai"
            />
          </div>
          <div className="col-span-1 flex justify-center md:col-span-2 lg:col-span-1">
            <img
              className="h-12"
              src="https://upload.wikimedia.org/wikipedia/commons/4/47/KIA_logo2.svg"
              alt="KIA"
            />
          </div>
          <div className="col-span-1 flex justify-center md:col-span-3 lg:col-span-1">
            <img
              className="h-12"
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Ford_logo_flat.svg/2560px-Ford_logo_flat.svg.png"
              alt="Ford"
            />
          </div>
          <div className="col-span-2 flex justify-center md:col-span-3 lg:col-span-1">
            <img
              className="h-12"
              src="https://upload.wikimedia.org/wikipedia/commons/5/5a/Mitsubishi_logo.svg"
              alt="Mitsubishi"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
