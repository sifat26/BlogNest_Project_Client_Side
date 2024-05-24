import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import * as React from 'react';
//  const Person = {
//         firstName,
//         lastName,
//         age,
//         visits,
//         status,
//         progress
//       }

      var SN,Title,OwnerName,Image;
      
      
     
const FeaturedBlogs = () => {
   

      const [data, setData] = React.useState(() => [])
      React.useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await fetch('https://blognest-server.vercel.app/blogs/sort');
            const result = await response.json();
      //  console.log(result);
    
  
  const defaultData = [
    
    
  ]
  
  let i=0;
  result.forEach(function(element){
    i++;
    // console.log("element",element);
    defaultData.push({
      SN: i,
      Title: element.title,
      OwnerName: element.userName,
     Image: element.userPhoto,
    })
    
  })

  // console.log("defaultdata",defaultData);
            
            setData(defaultData) 
            // if (Array.isArray(result) && result.every(item => typeof item.long_description === 'string')){
            //   const sortedData = result.sort((a, b) => b.long_description.localeCompare(a.long_description));
            // console.log(sortedData);
            // }
            
            // Step 4: Store and Display Data
            // setData(sortedData);
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };

        fetchData();
      }, []);
  // const rerender = React.useReducer(() => ({}), {})[1]
  const columnHelper = createColumnHelper();
  const columns = [
    columnHelper.accessor('SN', {
      // cell: info => info.getValue(),
      // footer: info => info.column.id,
    }),
    columnHelper.accessor("Title",
    {

    }
    //   row => row.Title, {
    //   id: 'Blog Title',
    //   cell: info => <i>{info.getValue()}</i>,
    //   header: () => <span>Blog Title</span>,
    //   footer: info => info.column.id,
    // }
  ),
    columnHelper.accessor('OwnerName', {
      // header: () => 'Owner Name',
      // cell: info => info.getValue(),
      // footer: info => info.column.id,
    }),
    columnHelper.accessor('Image', {
      //   cell : info => info.getValue(),
      // header: () => <span>Image</span>,
      // footer: info => info.column.id,
    }),
  ]
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })
    return (
        <div className="container lg:mx-auto md:mx-auto  lg:px-6  py-8">
          <h2 className="text-5xl text-center font-extrabold my-12">Featured Blogs</h2>
      {/* <table>
        <thead>
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <th key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )
                      }
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map(row => (
            <tr key={row.id}>
              {row.getVisibleCells().map(cell => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
  
      </table> */}
      
<table className="table-fixed w-full">
    <thead className="bg-gray-300">
    {table.getHeaderGroups().map(headerGroup => (
        <tr key={headerGroup.id}>
          {headerGroup.headers.map(header => (
            <th key={header.id} scope="col" className="px-6 py-3  lg:text-sm text-xs   tracking-wider w-1/4  text-left text-gray-600 font-bold uppercase">
                {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )
                      }
            </th>
            ))}
        </tr>
         ))}
    </thead>
    <tbody className="bg-white divide-y text-sm divide-gray-200">
  {table.getRowModel().rows.map(row => (
    <tr key={row.id}>
      {row.getVisibleCells().map(cell => (
        <td key={cell.id} className="py-4 px-6 border-b border-gray-200">
          {(() => {
            const cellValue = cell.getContext().getValue();
            if (typeof cellValue === 'string' && cellValue.startsWith('http')) {
              // Check if cell value is a URL (assuming images are provided as URLs)
              return <img src={cellValue} alt="Cell image" className="h-10 w-10 rounded-full" />;
            } else {
              // Render other types of data normally
              return flexRender(cell.column.columnDef.cell, cell.getContext());
            }
          })()}
        </td>
      ))}
    </tr>
  ))}
</tbody>

</table>

    
    </div>
    );
};


export default FeaturedBlogs;