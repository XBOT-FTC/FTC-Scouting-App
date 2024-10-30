//utility function that reads the first file in the file list WARNING: THIS FUNCTION IS CURRENTLY BROKEN
export async function ReadFile(files: FileList | null): Promise<string> {
  const file = files?.[0];
  const fileReader = new FileReader();
  let key: any;
  fileReader.onload = (event) => {
    clearTimeout(key);
    const cacheReturn = event.target?.result;
    alert(cacheReturn);
    return cacheReturn;
  };
  fileReader.readAsText(file!);
  //tell typescript to shut up
  key = setTimeout(() => {}, 100000);
  return "";
}
