// Common TableHead
const TableHead = ({ alcoholClassesMap }: any) => {
  const populateHeaderColumns = () => {
    const header = [];
    for (const key of alcoholClassesMap.keys())
      header.push(<th>Class {key}</th>);
    return header;
  };

  return (
    <thead>
      <tr>
        <th>Measue</th>
        {populateHeaderColumns()}
      </tr>
    </thead>
  );
};

export default TableHead;
