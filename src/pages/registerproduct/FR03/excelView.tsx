export function ExcelViewer({ url }: { url: string }) {
  const officeSrc =
    "https://view.officeapps.live.com/op/embed.aspx?src=" +
    encodeURIComponent(url);
  return (
    <iframe
      title="Excel"
      src={officeSrc}
      width="100%"
      height="750"
      style={{ border: "none" }}
    />
  );
}
