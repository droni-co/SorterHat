import { readdir } from "node:fs/promises";
import fs from "node:fs";


interface FileEEFF {
  code: string;
  filename: string;
  path: string;
  date: string;
  month: string;
  year: string;
  ext: string;
  copied: boolean;
}
export default {
  readFiles: async (folder:string) => {
    const outputDir = folder + '/output';
    if (fs.existsSync(outputDir)) fs.rmdirSync(outputDir, { recursive: true })
    fs.mkdirSync(outputDir)
    // read all the files in the current directory, recursively
    let files = await readdir(folder, { recursive: true })
    files = files.filter((file) => file.endsWith(".pdf") || file.endsWith(".xlsx"))

    const results:FileEEFF[] = [];

    for (const file of files) {
      // file = '11226_FAFPG_MTCR2_ACREENCIA_TECH_OPPOTUNITIES_LLC_202311-202212_ter_102091.pdf'
      const date:string = String('202' + String(file.split('_202').pop()).split('-')[0])
      const record:FileEEFF = {
        code: file.split("/").pop().split("_")[0],
        filename: file.split("/").pop() ?? 'error',
        path: file,
        date: date ?? 'error',
        month: date.slice(4, 6) ?? 'error',
        year: date.slice(0, 4) ?? 'error',
        ext: file.split(".").pop() ?? 'error',
        copied: false
      }
      results.push(record)
      /* Copy file to output directory */
      if (!fs.existsSync(`${outputDir}/${record.year}-${record.month}`)) fs.mkdirSync(`${outputDir}/${record.year}-${record.month}`, { recursive: true })
      console.log('copied from')
      console.log(`${folder}/${record.path}`)
      console.log('to code')
      console.log(`${record.code}`)
      try {
        fs.copyFileSync(`${folder}/${record.path}`, `${outputDir}/${record.year}-${record.month}/${record.code}.${record.ext}`)
        record.copied = true
      } catch (error) {
        console.error(error)
      }
    }
    return results;
  }
}
