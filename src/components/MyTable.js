import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import { IconButton } from '@material-ui/core'
import {
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    TableSortLabel,
    TableContainer
} from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%'
    },
    paper: {
        width: '100%',
        marginBottom: theme.spacing(2)
    },
    table: {
        minWidth: 10
    },
    visuallyHidden: {
        border: 0,
        clip: 'rect(0 0 0 0)',
        height: 1,
        margin: -1,
        overflow: 'hidden',
        padding: 0,
        position: 'absolute',
        top: 20,
        width: 1
    },
    cell: {
        whiteSpace: 'normal',
        wordBreak: 'break-word'
    }
}))

MyTable.propTypes = {
    tableContent: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            label: PropTypes.string.isRequired,
            values: PropTypes.array.isRequired
        })
    ).isRequired,
    pagination: PropTypes.bool,
    title: PropTypes.string,
    wrapText: PropTypes.bool,
    truncateText: PropTypes.bool,
    size: PropTypes.oneOf(['small', 'medium']).isRequired,
    hover: PropTypes.bool,
    nextPage: PropTypes.func,
    previewsPage: PropTypes.func,
    page: PropTypes.number,
    sortBy: PropTypes.array,
    onSortChanged: PropTypes.func,
    rowsCount: PropTypes.number,
    onClick: PropTypes.func,
    onClickIdRow: PropTypes.string,
    height: PropTypes.string
}

export default function MyTable({
    tableContent,
    pagination = false,
    title = '',
    wrapText = true,
    size,
    hover = true,
    page,
    nextPage = () => {},
    previewsPage = () => {},
    truncateText = false,
    sortBy = [],
    onSortChanged,
    rowsCount,
    onClick,
    onClickIdRow,
    height = undefined
}) {
    const classes = useStyles()

    const tableContainerStyle = { height: height }

    return (
        <div className={classes.root}>
            <Paper className={classes.paper}>
                {title ? (
                    <Typography
                        style={{ flex: '1 1 100%', margin: 13 }}
                        variant='h6'
                        id='tableTitle'>
                        {title}
                    </Typography>
                ) : null}
                <TableContainer style={tableContainerStyle}>
                    <Table
                        style={{
                            minWidth: '100%',
                            padding: '16px',
                            tableLayout: wrapText ? classes.cell : ''
                        }}
                        stickyHeader
                        aria-labelledby='tableTitle'
                        size={size}
                        aria-label='enhanced table'>
                        <TableHead>
                            <TableRow>
                                {tableContent.map((column, index) => (
                                    <React.Fragment key={index}>
                                        {column.id !== onClickIdRow && (
                                            <TableCell
                                                style={{ fontWeight: 'bold' }}>
                                                {onSortChanged &&
                                                sortBy.includes(
                                                    column.id.toUpperCase()
                                                ) ? (
                                                    <TableSortLabel
                                                        onClick={() => {
                                                            onSortChanged(
                                                                column.id
                                                            )
                                                        }}
                                                        direction={'desc'}>
                                                        {column.label}
                                                    </TableSortLabel>
                                                ) : (
                                                    column.label
                                                )}
                                            </TableCell>
                                        )}
                                    </React.Fragment>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody
                            style={{
                                overflowY: 'auto'
                            }}>
                            {tableContent[0].values.map((_, rowIndex) => (
                                <TableRow hover={hover} key={rowIndex}>
                                    {tableContent.map((row, colIndex) => (
                                        <React.Fragment key={colIndex}>
                                            {row.id !== onClickIdRow && (
                                                <TableCell
                                                    onClick={() => {
                                                        if (onClickIdRow) {
                                                            let index = tableContent.findIndex(
                                                                (value) =>
                                                                    value.id ===
                                                                    onClickIdRow
                                                            )
                                                            onClick(
                                                                tableContent[
                                                                    index
                                                                ].values[
                                                                    rowIndex
                                                                ]
                                                            )
                                                        }
                                                    }}
                                                    style={
                                                        truncateText
                                                            ? {
                                                                  whiteSpace:
                                                                      'nowrap',
                                                                  textOverflow:
                                                                      'ellipsis',
                                                                  width: '50px',
                                                                  overflow:
                                                                      'hidden'
                                                              }
                                                            : {}
                                                    }>
                                                    {row.values[rowIndex]}
                                                </TableCell>
                                            )}
                                        </React.Fragment>
                                    ))}
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                {pagination ? (
                    <div
                        style={{
                            color: 'rgba(0, 0, 0, 0.87)',
                            overflow: 'auto',
                            fontSize: '0.875rem'
                        }}>
                        <div
                            style={{
                                display: 'flex',
                                position: 'relative',
                                alignItems: 'center',
                                minHeight: 52,
                                paddingRight: 2
                            }}>
                            <div
                                style={{
                                    flex: '1 1 100%'
                                }}
                            />
                            <p
                                style={{
                                    flexShrink: 0
                                }}>
                                Page: {page}
                            </p>
                            <p
                                style={{
                                    flexShrink: 0,
                                    marginLeft: 20
                                }}>
                                Total Rows: {rowsCount}
                            </p>
                            <div
                                style={{
                                    flexShrink: 0,
                                    marginLeft: 20
                                }}>
                                <div>
                                    <IconButton
                                        color='dimgray'
                                        size='small'
                                        aria-label='+1'
                                        onClick={previewsPage}
                                        style={{
                                            marginLeft: '5px',
                                            marginRight: '5px'
                                        }}>
                                        {'<-'}
                                    </IconButton>
                                    <IconButton
                                        color='dimgray'
                                        size='small'
                                        aria-label='+1'
                                        onClick={nextPage}
                                        style={{
                                            marginLeft: '5px',
                                            marginRight: '5px'
                                        }}>
                                        {'->'}
                                    </IconButton>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : null}
            </Paper>
        </div>
    )
}
