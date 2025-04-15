import {useEffect, useState} from "react";
import {DataGrid} from '@mui/x-data-grid';
import {api} from "../util/api";
import {Button} from "@mui/material";
import toast from "react-hot-toast";
import {Box, ButtonGroup, CircularProgress} from "@mui/joy";

export default function NotificationsList() {
    const [notifications, setNotifications] = useState(null);
    const [page, setPage] = useState(0); // Current page (0-based index)
    const [pageSize, setPageSize] = useState(5); // Number of rows per page
    const [rowCount, setRowCount] = useState(0); // Total number of rows
    const [refreshNotifications, setRefreshNotifications] = useState(true);
    const [isLoadingNotifications, setIsLoadingNotifications] = useState(true);

    function fetchNotifications(currentPage, currentPageSize) {
        api().get(`/notifications?page=${currentPage + 1}&pageSize=${currentPageSize}`)
            .then((result) => {
                if (result && result.data) {
                    setNotifications(result.data.Rows);
                    setRowCount(result.data.TotalRows); // Update total row count
                } else {
                    setNotifications([]);
                    setRowCount(0);
                }
            })
            .catch((error) => {
                toast.error('Something went wrong, try again later');
                setNotifications([]);
                setRowCount(0);
            })
            .finally(() => {
                setIsLoadingNotifications(false);
            });
    }

    useEffect(() => {
        if (refreshNotifications) {
            setRefreshNotifications(false);
            fetchNotifications(page, pageSize);
        }
    }, [refreshNotifications]);

    function deleteNotification(id) {
        api()
            .delete(`/notifications/${id}`)
            .then(() => {
                setRefreshNotifications(true);
                setPage(0);
                setIsLoadingNotifications(true);
            })
            .catch((error) => {
                console.log(error);
                toast.error('Something went wrong, try again later');
            });
    }

    function notifyNotification(id) {
        api()
            .get(`/notifications/notify/${id}`)
            .then(() => {
                setRefreshNotifications(true);
                setPage(0);
                setIsLoadingNotifications(true);
            })
            .catch((error) => {
                let errorMsg = 'Something went wrong, try again later';
                if (error.status === 400) {
                    errorMsg = error.response.data.error;
                }
                toast.error(errorMsg);
            });
    }

    const columns = [
        {
            field: 'ClientId',
            headerName: 'Client Id',
            width: 150,
            sortable: false
        },
        {
            field: 'ClientGroupId',
            headerName: 'Client Group Id',
            width: 150,
            sortable: false
        },
        {
            field: 'Body',
            headerName: 'Body',
            width: 150,
            sortable: false,
        },
        {
            field: 'CreatedAt',
            headerName: 'Created At',
            width: 250,
            sortable: false,
        },
        {
            field: 'NotifiedAt',
            headerName: 'Notified At',
            width: 250,
            sortable: false,
        },
        {
            field: 'ID',
            headerName: '',
            width: 300,
            sortable: false,
            renderCell: (params) => (
                <ButtonGroup variant="contained" aria-label="Basic button group">
                    <Button
                        variant="contained"
                        size="small"
                        color={'success'}
                        onClick={() => notifyNotification(params.value)}
                    >
                        Notify
                    </Button>
                    <Button
                        variant="contained"
                        size="small"
                        color={'warning'}
                        onClick={() => deleteNotification(params.value)}
                    >
                        Delete
                    </Button>
                </ButtonGroup>
            )
        }
    ];

    return (
        <>
            <Box textAlign="left">
                <Box mb={2}>
                    <Button variant={'contained'} onClick={() => {
                        setIsLoadingNotifications(true);
                        setRefreshNotifications(true);
                    }}>
                        Refresh notifications list
                    </Button>
                </Box>

                <div style={{height: 400, width: '100%'}}>
                    {
                        isLoadingNotifications ? (
                            <CircularProgress/>
                        ) : (
                            <DataGrid
                                autoPageSize={false}
                                rows={notifications}
                                columns={columns}
                                rowCount={rowCount}
                                page={page}
                                pageSize={pageSize}
                                defaultPageSize={pageSize}
                                paginationMode="server"
                                paginationModel={{page, pageSize}}
                                onPaginationModelChange={(model) => {
                                    setPage(model.page);
                                    setPageSize(model.pageSize);
                                    setRefreshNotifications(true);
                                }}
                                initialState={{
                                    sorting: {
                                        sortModel: [{field: 'CreatedAt', sort: 'desc'}],
                                    },
                                }}
                                checkboxSelection
                                disableRowSelectionOnClick
                                getRowId={(row) => row.ID}
                            />
                        )
                    }
                </div>
            </Box>
        </>
    );
}