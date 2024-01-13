import React, { useEffect, useRef } from 'react'
import styled from 'styled-components'
import { InnerLayout } from "../../styles/Layout";
import { useReactToPrint } from "react-to-print";
import { dollar } from '../../utils/Icons';
import { bitcoin, book, calender, card, circle, clothing, comment,  food, freelance, medical, money, piggy, stocks, takeaway, trash, tv, users, yt } from '../../utils/Icons';
import { useGlobalContext } from "../../context/globalContext";
import Button from '../Button/Button';
import { useTable } from "react-table";
import { jsPDF } from "jspdf";
import 'jspdf-autotable';
import * as XLSX from 'xlsx';
import { utils, writeFile } from 'xlsx';

function AdminPanel() {
    const { users, incomes, expenses, getUsers, deleteUser } = useGlobalContext()
    const componentPDF = useRef();
    useEffect(() => {
        getUsers()
        console.log(users)       
    }, [])

    const columns = React.useMemo(
        () => [
          {
            Header: "ID",
            accessor: "id",
          },
          {
            Header: "Full Name",
            accessor: "full_name",
          },
          {
            Header: "Email",
            accessor: "user_email",
          },
          {
            Header: "Password",
            accessor: "password",
          },
          {
            Header: "Country",
            accessor: "country",
          },
          {
            Header: "Created At",
            accessor: "createdAt",
          },
        ],
        []
    );

    //Формирование отчета в формате .xlsl
    const createXlsl = async (e) => {
        const dataForSheet = users.map((item) => {
            return [item.id, item.user_email, item.password, 
            item.full_name, item.country, item.createdAt, item.updatedAt]; 
        });

        const workbook = XLSX.utils.book_new();
        const sheetName = "Sheet1";
        const worksheet = XLSX.utils.aoa_to_sheet([['id', 'user_email', 'password', 'full_name', 'country',
    'createdAt', 'updatedAt'], ...dataForSheet]);
        XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);
        
        XLSX.writeFile(workbook, 'data.xlsx');
    }

    //Формирование отчета в формате .pdf
    const createPdf = () => {
        var jsonData = users
        const doc = new jsPDF();
        const tableHeaders = Object.keys(jsonData[0]);
        const tableData = jsonData.map((object) => Object.values(object));
 
        doc.autoTable({
            head: [tableHeaders],
            body: tableData,
        });

        doc.save("users.pdf");
    }

    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({ columns, data:users });
    
    return (
        <DashboardStyled>
            <InnerLayout>
            <center><h1>Все пользователи</h1></center>     
                <div ref={componentPDF} className="container">
                    <table {...getTableProps()}>
                    <thead>
                        {headerGroups.map((headerGroup) => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map((column) => (
                            <th {...column.getHeaderProps()}>
                                {column.render("Header")}
                            </th>
                            
                            ))}
                            <th></th>
                        </tr>
                        ))}
                    </thead>
                    <tbody {...getTableBodyProps()}>
                        {rows.map((row) => {
                        prepareRow(row);
                        return (
                            <tr {...row.getRowProps()}>
                            {row.cells.map((cell) => (
                                <td {...cell.getCellProps()}> {cell.render("Cell")} </td>
                            ))}
                            <td>
                                <div className="btn-con">
                                    <Button 
                                        icon={trash}
                                        bPad={'1rem'}
                                        bRad={'50%'}
                                        bg={'var(--primary-color'}
                                        color={'#fff'}
                                        iColor={'#fff'}
                                        hColor={'var(--color-green)'}
                                        onClick={() => deleteUser(row.id)}
                                    />
                                </div>
                            </td>
                            </tr>
                            
                        );
                        })}
                    </tbody>
                    </table>
                </div>  
               
               <div className='buttons'>
                <div className="submit-btn">
                        <Button 
                            name={'Выгрузить все данные в .xlsx'}
                            bPad={'.8rem 1.6rem'}
                            bRad={'30px'}
                            bg={'var(--color-accent'}
                            color={'#fff'}
                            onClick={() => createXlsl()}
                        />
                    </div>
                    <div className="submit-btn">
                        <Button 
                            name={'Выгрузить все данные в .pdf'}
                            bPad={'.8rem 1.6rem'}
                            bRad={'30px'}
                            bg={'var(--color-accent'}
                            color={'#fff'}
                            onClick={() => createPdf()}
                        />
                    </div>
               </div>
                
            </InnerLayout>
        </DashboardStyled>
    );
}

const DashboardStyled = styled.div`
height: 850px;

.container tr td{
    font-weight: 600;
    color: black
}

.buttons {
    display: flex;
    flex-direction: row;
    column-gap: 18px;
    margin-top: 700px;
}

.container {
    position: absolute;
    top: 50%;
    left: 50%;
    max-height: 600px;
    overflow-y: scroll;
    -webkit-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
  }
  table {
    width: 800px;
    height: 800px;
    border-collapse: collapse;
    overflow: hidden;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  }
  th,
  td {
    padding: 15px;
    background-color: rgba(255, 255, 255, 0.2);
    color: #fff;
  }
  th {
    text-align: left;
  }
  thead th {
    background-color: #55608f;
  }
  tbody tr:hover {
    background-color: rgba(255, 255, 255, 0.3);
  }
  tbody td {
    position: relative;
  }
  tbody td:hover:before {
    content: "";
    position: absolute;
    left: 0;
    right: 0;
    top: -9999px;
    bottom: -9999px;
    background-color: rgba(255, 255, 255, 0.2);
    z-index: -1;
  }

.history-item{
    background: #FCF6F9;
    border: 2px solid #FFFFFF;
    box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
    padding: 1rem;
    border-radius: 20px;
    display: flex;
    justify-content: space-between;
    width: 2300px
    align-items: center;
}

.stats-con{
    margin-top: 40px;
    display: flex;
    align-items:center;
    grid-template-columns: repeat(5, 1fr);
    gap: 2rem;
    .chart-con{
        grid-column: 1 / 4;
        height: 400px;
        .amount-con{
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 2rem;
            margin-top: 2rem;
            .income, .expense{
                grid-column: span 2;
            }
            .income, .expense, .balance{
                background: #FCF6F9;
                border: 2px solid #FFFFFF;
                box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
                border-radius: 20px;
                padding: 1rem;
                p{
                    font-size: 3.5rem;
                    font-weight: 700;
                }
            }

            .balance{
                grid-column: 2 / 4;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                p{
                    color: var(--color-green);
                    opacity: 0.6;
                    font-size: 4.5rem;
                }
            }
        }
    }

    .history-con{
        grid-column: 4 / -1;
        h2{
            margin: 1rem 0;
            display: flex;
            align-items: center;
            justify-content: space-between;
        }
        .salary-title{
            font-size: 1.2rem;
            span{
                font-size: 1.8rem;
            }
        }
        .salary-item{
            background: #FCF6F9;
            border: 2px solid #FFFFFF;
            box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
            padding: 1rem;
            border-radius: 20px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            p{
                font-weight: 600;
                color: black
                font-size: 1.6rem;
            }
        }
    }
}
`;

export default AdminPanel