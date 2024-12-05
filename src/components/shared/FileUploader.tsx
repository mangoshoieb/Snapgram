import  { useCallback, useState } from "react";
import { FileWithPath, useDropzone } from "react-dropzone";
import { Button } from "../ui/button";
interface FileProps{
    filedChange:(FILES:File[])=>void,
    mediaUrl:string,
}
export default function FileUploader({filedChange,mediaUrl}:FileProps) {
    const [file, setFile] = useState<File[]>([])
  const [fileUrl, setFileUrl] = useState(mediaUrl);
  const onDrop = useCallback((acceptedFiles:FileWithPath[]) => {
    setFile(acceptedFiles)
    filedChange(acceptedFiles)
    setFileUrl(URL.createObjectURL(acceptedFiles[0]))
  }, [file]);
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".jpg", ".jpeg", ".png", ".svg"],
    },
  });

  return (
    <div
      {...getRootProps()}
      className="flex flex-col flex-center bg-dark-3 rounded-xl cursor-pointer"
    >
      <input {...getInputProps()} className="cursor-pointer" />
      {fileUrl ? (
        <div>
            <div className="flex flex-1 justify-center w-full p-5 lg:p-10">
                <img src={fileUrl} alt="image" className="file_uploader-img"/>
            </div>
            <p className="file_uploader-label">Drag photo here</p>
        </div>
      ) : (
        <div className="file_uploader-box">
          <img
            src="assets/icons/file-upload.svg"
            width={96}
            height={77}
            alt="file-upload"
          />
          <h2 className="base-meduim text-light-2 mb-2 mt-6">
            Drag Photo here
          </h2>
          <p className="small-regular text-light-4 mb-6">SVG,JPG,PNG</p>
          <Button className="shad-button_dark_4">Select from computer</Button>
        </div>
      )}
    </div>
  );
}
