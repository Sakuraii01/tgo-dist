import { useDropzone } from "react-dropzone";
import { useCallback, useState, useEffect } from "react";

type dropZoneType = {
  handleUpload: (file: File) => void;
  file: File | string | null;
};
export const Dropzone = (props: dropZoneType) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const imageFile = acceptedFiles[0];
      if (imageFile) {
        props.handleUpload(imageFile);
        setPreviewUrl(URL.createObjectURL(imageFile));
      }
    },
    [props.handleUpload]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    multiple: false,
  });
  useEffect(() => {
    if (props.file instanceof File) {
      const url = URL.createObjectURL(props.file);
      setPreviewUrl(url);

      // return () => URL.revokeObjectURL(url); /
    } else if (typeof props.file === "string") {
      setPreviewUrl(props.file);
    } else {
      setPreviewUrl(null);
    }
  }, [props.file]);

  return (
    <div
      {...getRootProps()}
      className={`border border-gray-400 rounded-lg ${
        previewUrl ? "p-2" : "py-30"
      } my-4 cursor-pointer`}
    >
      {props.file ? (
        <div>
          {previewUrl && (
            <img
              src={previewUrl}
              alt="Preview"
              className="w-auto h-full object-cover mx-auto rounded-lg"
            />
          )}
          <input {...getInputProps()}></input>
        </div>
      ) : (
        <div>
          <input {...getInputProps()} />
          <div>
            {isDragActive ? (
              <div>
                <p>Drop file here</p>
              </div>
            ) : (
              <p className="text-center">อัพโหลดรูปภาพ</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
