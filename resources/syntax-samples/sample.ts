import fs from 'fs';

interface ListEntry {
  key: string;
  value?: number;
}

const fileName = 'input.txt';

async function toList(fn: string): Promise<ListEntry[]> {
  const content = await new Promise<string>((res, rej) =>
    fs.readFile(fn, (err, data) => (err ? rej(err) : res(data.toString())))
  );
  return content.split('\n').map((line) => {
    const [_, key, value] = line.match(/^key = ([^,]*), value = (.*)$/g);
    return { key, value: parseInt(value) };
  });
}

toList(fileName).then((list) =>
  fs.writeFile('list.json', JSON.stringify(list), console.log)
);
