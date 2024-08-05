import { useState, ChangeEvent } from "react";
import Head from "next/head";
import Paper from "@src/components/Paper";
import Typography from "@src/components/Typography";
import data from "@src/lib/glossary.json"; // Assuming glossary data is in the src/lib directory
import TextField from "@src/components/TextField";
import { Search } from "@src/assets/icons";

interface GlossaryItem {
  term: string;
  definition: string;
}

interface GlossaryData {
  glossary: GlossaryItem[];
}

const glossaryData: GlossaryData = data;

export default function Glossary() {
  const [searchTerm, setSearchTerm] = useState<string>("");

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const filteredData = glossaryData.glossary.filter((item) =>
    item.term.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const groupedData = filteredData.reduce<Record<string, GlossaryItem[]>>(
    (acc, item) => {
      const firstLetter = item.term[0].toUpperCase();
      if (!acc[firstLetter]) acc[firstLetter] = [];
      acc[firstLetter].push(item);
      return acc;
    },
    {}
  );

  return (
    <>
      <Head>
        <title>Glossary page</title>
        <meta name="description" content="Glossary page" />
      </Head>
      <Paper className="w-full flex flex-col gap-4 p-4 min-h-full">
        <Typography variant="h2">Glossary of Terms</Typography>
        <div
          className={`bg-gray-200 rounded-lg flex gap-2 items-center p-2 relative max-w-[300px]`}
        >
          <Search className="w-8 h-8 text-black" />
          <TextField
            className="bg-white rounded-lg placeholder:text-caption px-2 h-[42px]"
            type="text"
            placeholder="Search here..."
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
        <div className="mt-4">
          {Object.keys(groupedData)
            .sort()
            .map((letter) => (
              <div key={letter} className="mb-6">
                <Typography variant="h4" className="mb-2" fontweight="semiBold">
                  {letter}
                </Typography>
                {groupedData[letter].map((item) => (
                  <div
                    key={item.term}
                    className="p-2 bg-gray-200 rounded-lg mb-2 flex justify-between items-center"
                  >
                    <Typography
                      variant="body1"
                      className="font-semibold rounded-10 p-4 bg-white dark:bg-customGrayDark"
                    >
                      {item.term}
                    </Typography>
                    <Typography variant="body2" className="!text-black">
                      {item.definition}
                    </Typography>
                  </div>
                ))}
              </div>
            ))}
        </div>
      </Paper>
    </>
  );
}
