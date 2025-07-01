// helper functions

export const convertUnixMsecToDatetime = (unixMsecTimestamp: string | number | Date) => {
  var date = new Date(unixMsecTimestamp);
    // Hours part from the timestamp
    var hours = date.getHours();
  
    // Minutes part from the timestamp
    var minutes = "0" + date.getMinutes();
    
    // Seconds part from the timestamp
    var seconds = "0" + date.getSeconds();
    
    // Will display time in 10:30:23 format
    var formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
    
    return date
}

export const getCurrentFormattedDate = (): string => {
  const currentDate = new Date();
  
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Months are 0-based
  const day = String(currentDate.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
};

export const toCamelCase = (rows: any) => {
  return rows.map((row: any) => {
    const replaced: Record<string, any> = {}

    // we'll then iterate over every key (column name) of a single row
    for (let key in row) {
      const camelCase = key.replace(/([-_][a-z])/gi, ($1) => 
        $1.toUpperCase().replace("_", "")
      )

      // the row will now have the column name in camel case:
      replaced[camelCase] = row[key]
    }

    return replaced;
  })
}