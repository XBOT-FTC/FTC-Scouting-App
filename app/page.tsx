export default function Home() {
  return (
    <div className="grid justify-center">
      <img src="image.png" width={201} height={191} />
      <div className="grid justify-center text-2xl">
        <p>
          <b>Welcome!</b>
        </p>
      </div>
      <div className="h-428 w-277 box-content border-black p-4"></div>
      <form action={"/url"} method="GET">
        <p>Enter Name</p>
        <input type="text" placeholder="Name" required></input>
        <div className="grid justify-center">
          <button type="submit">Next</button>
        </div>
      </form>
      <div className="grid justify-center">XBOT ROBOTICS</div>
    </div>
  );
}
