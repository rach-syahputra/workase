const BackgroundElements = () => {
  return (
    <>
      {/* left line */}
      <div className="border-primary-gray absolute left-4 top-[50%] h-full max-h-[80%] w-0.5 -translate-y-[50%] border-l border-dashed opacity-50"></div>
      {/* right line */}
      <div className="border-primary-gray absolute right-4 top-[50%] h-full max-h-[80%] w-0.5 -translate-y-[50%] border-r border-dashed opacity-50"></div>
      {/* top line */}
      <div className="border-primary-gray absolute left-4 top-[20%] h-0.5 w-[95%] border-t border-dashed opacity-50"></div>
      {/* bottom line */}
      <div className="border-primary-gray absolute bottom-[20%] h-0.5 w-[calc(100%-32px)] -translate-y-[50%] border-b border-dashed opacity-50"></div>
      {/* top circle */}
      <div className="border-primary-gray absolute -left-[24px] top-[20%] aspect-square w-[80px] -translate-y-[50%] rounded-full border border-dashed opacity-50"></div>
      {/* bottom circle */}
      <div className="border-primary-gray absolute -right-[24px] bottom-[20%] aspect-square w-[80px] translate-y-[50%] rounded-full border border-dashed opacity-50"></div>

      <div className="border-primary-gray absolute bottom-[10%] left-[20%] h-full max-h-[50%] w-0.5 border-l border-dashed opacity-50 max-md:hidden"></div>
      <div className="border-primary-gray absolute bottom-[10%] right-[20%] h-full max-h-[50%] w-0.5 border-l border-dashed opacity-50 max-md:hidden"></div>
    </>
  );
};

export default BackgroundElements;
