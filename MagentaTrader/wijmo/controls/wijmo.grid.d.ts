/*
    *
    * Wijmo Library 5.20143.27
    * http://wijmo.com/
    *
    * Copyright(c) GrapeCity, Inc.  All rights reserved.
    * 
    * Licensed under the Wijmo Commercial License. 
    * sales@wijmo.com
    * http://wijmo.com/products/wijmo-5/license/
    *
    */
/**
* Defines the @see:FlexGrid control and associated classes.
*
* The example below creates a @see:FlexGrid control and binds it to a
* 'data' array. The grid has three columns, specified by explicitly
* populating the grid's @see:columns array.
*
* @fiddle:6GB66
*/
declare module wijmo.grid {
    /**
    * Specifies constants that specify the visibility of row and column headers.
    */
    enum HeadersVisibility {
        /** No header cells are displayed. */
        None = 0,
        /** Only column header cells are displayed. */
        Column = 1,
        /** Only row header cells are displayed. */
        Row = 2,
        /** Both column and row header cells are displayed. */
        All = 3,
    }
    /**
    * The @see:FlexGrid control provides a powerful and flexible way to
    * display and edit data in a tabular format.
    *
    * The @see:FlexGrid control is a full-featured grid, providing all the
    * features you are used to including several selection modes, sorting,
    * column reordering, grouping, filtering, editing,  custom cells,
    * XAML-style star-sizing columns, row and column virtualization, etc.
    */
    class FlexGrid extends Control {
        private _root;
        private _eCt;
        private _eTL;
        private _eCHdr;
        private _eRHdr;
        private _eCHdrCt;
        private _eRHdrCt;
        private _eTLCt;
        private _eSz;
        private _gpCells;
        private _gpCHdr;
        private _gpRHdr;
        private _gpTL;
        private static _maxCssHeight;
        private _maxOffsetY;
        private _heightBrowser;
        private _szClient;
        private _ptScrl;
        private _offsetY;
        private _rcBounds;
        private _lastCount;
        public _rtl: boolean;
        private _isChrome;
        public _isIE: boolean;
        private _keyHdl;
        private _mouseHdl;
        public _edtHdl: _EditHandler;
        public _selHdl: _SelectionHandler;
        private _addHdl;
        private _mrgMgr;
        private _autoGenCols;
        private _autoClipboard;
        private _readOnly;
        private _indent;
        private _allowResizing;
        private _allowDragging;
        private _hdrVis;
        private _alSorting;
        private _alAddNew;
        private _alDelete;
        private _alMerging;
        private _shSort;
        private _shGroups;
        private _gHdrFmt;
        private _rows;
        private _cols;
        private _hdrRows;
        private _hdrCols;
        private _cf;
        private _itemFormatter;
        private _items;
        private _cv;
        private _childItemsPath;
        /**
        * Gets or sets the template used to instantiate @see:FlexGrid controls.
        */
        static controlTemplate: string;
        /**
        * Initializes a new instance of a @see:FlexGrid control.
        *
        * @param element The DOM element that will host the control, or a selector for the host element (e.g. '#theCtrl').
        * @param options JavaScript object containing initialization data for the control.
        */
        constructor(element: any, options?: any);
        /**
        * Gets or sets a value that determines whether the row and column headers
        * are visible.
        */
        public headersVisibility : HeadersVisibility;
        /**
        * Gets or sets whether the grid should generate columns automatically based on the @see:itemsSource.
        */
        public autoGenerateColumns : boolean;
        /**
        * Gets or sets whether the grid should handle clipboard shortcuts.
        *
        * The clipboard commands are as follows:
        *
        * <dl class="dl-horizontal">
        *   <dt>ctrl+C, ctrl+Ins</dt>    <dd>Copy grid selection to cliboard.</dd>
        *   <dt>ctrl+V, shift+Ins</dt>   <dd>Paste clipboard text to grid selection.</dd>
        * </dl>
        *
        * Only visible rows and columns are included in clipboard operations.
        *
        * Read-only cells are not affected by paste operations.
        */
        public autoClipboard : boolean;
        /**
        * Gets or sets a JSON string that defines the current column layout.
        *
        * The column layout string represents an array with the columns and their
        * properties. It can be used to persist column layouts defined by users so
        * they are preserved across sessions, and can also be used to implement undo/redo
        * functionality in applications that allow users to modify the column layout.
        *
        * The column layout string does not include <b>dataMap</b> properties, because
        * data maps are not serializable.
        */
        public columnLayout : string;
        /**
        * Gets or whether the user can edit the grid cells by typing into them.
        */
        public isReadOnly : boolean;
        /**
        * Gets or sets whether users are allowed to resize rows and/or columns with the mouse.
        */
        public allowResizing : AllowResizing;
        /**
        * Gets or sets whether users are allowed to sort columns by clicking the column header cells.
        */
        public allowSorting : boolean;
        /**
        * Gets or sets a value that indicates whether the grid should provide a new row
        * template so users can add items to the source collection.
        *
        * The new row template will not be displayed if the @see:isReadOnly property
        * is set to true.
        */
        public allowAddNew : boolean;
        /**
        * Gets or sets a value that indicates whether the grid should delete
        * selected rows when the user presses the Delete key.
        *
        * Selected rows will not be deleted if the @see:isReadOnly property
        * is set to true.
        */
        public allowDelete : boolean;
        /**
        * Gets or sets which parts of the grid provide cell merging.
        */
        public allowMerging : AllowMerging;
        /**
        * Gets or sets whether the grid should display sort indicators in the column headers.
        *
        * Sorting is controlled by the @see:sortDescriptions property of the
        * @see:ICollectionView object used as a the grid's @see:itemsSource.
        */
        public showSort : boolean;
        /**
        * Gets or sets whether the grid should insert group rows to delimit data groups.
        *
        * Data groups are created by modifying the @see:groupDescriptions property of the
        * @see:ICollectionView object used as a the grid's @see:itemsSource.
        */
        public showGroups : boolean;
        /**
        * Gets or sets the format string used to create the group header content.
        *
        * The string may contain any text, plus the following replacement strings:
        * <ul>
        *   <li><b>{name}</b>: The name of the property being grouped on.</li>
        *   <li><b>{value}</b>: The value of the property being grouped on.</li>
        *   <li><b>{level}</b>: The group level.</li>
        *   <li><b>{count}</b>: The total number of items in this group.</li>
        * </ul>
        *
        * The default value for this property is
        * '{name}: &lt;b&gt;{value}&lt;/b&gt;({count} items)',
        * which creates group headers similar to
        * 'Country: <b>UK</b> (12 items)' or 'Country: <b>Japan</b> (8 items)'.
        */
        public groupHeaderFormat : string;
        /**
        * Gets or sets whether users are allowed to drag rows and/or columns with the mouse.
        */
        public allowDragging : AllowDragging;
        /**
        * Gets or sets the array or @see:ICollectionView that contains items shown on the grid.
        */
        public itemsSource : any;
        /**
        * Gets the @see:ICollectionView that contains the grid data.
        */
        public collectionView : collections.ICollectionView;
        /**
        * Gets or sets the name of the property used to generate child rows in hierarchical grids.
        */
        public childItemsPath : string;
        /**
        * Gets the @see:GridPanel that contains the data cells.
        */
        public cells : GridPanel;
        /**
        * Gets the @see:GridPanel that contains the column header cells.
        */
        public columnHeaders : GridPanel;
        /**
        * Gets the @see:GridPanel that contains the row header cells.
        */
        public rowHeaders : GridPanel;
        /**
        * Gets the @see:GridPanel that contains the top left cells.
        */
        public topLeftCells : GridPanel;
        /**
        * Gets the grid's row collection.
        */
        public rows : RowCollection;
        /**
        * Gets the grid's column collection.
        */
        public columns : ColumnCollection;
        /**
        * Gets or sets the number of frozen rows.
        *
        * Frozen rows do not scroll, but the cells they contain
        * may be selected and edited.
        */
        public frozenRows : number;
        /**
        * Gets or sets the number of frozen columns.
        *
        * Frozen columns do not scroll, but the cells they contain
        * may be selected and edited.
        */
        public frozenColumns : number;
        /**
        * Gets or sets a @see:Point that represents the value of the grid's scrollbars.
        */
        public scrollPosition : Point;
        /**
        * Gets the client size of the control (control size minus headers minus scrollbars).
        */
        public clientSize : Size;
        /**
        * Gets the bounding rectangle of the control in page coordinates.
        */
        public controlRect : Rect;
        /**
        * Gets the size of the grid content in pixels.
        */
        public scrollSize : Size;
        /**
        * Gets the range of cells currently in view.
        */
        public viewRange : CellRange;
        /**
        * Gets the @see:CellFactory that creates and updates cells for this grid.
        */
        public cellFactory : CellFactory;
        /**
        * Gets or sets a formatter function used to customize cells on this grid.
        *
        * The formatter function can add any content to any cell. It provides
        * complete flexibility over the appearance and behavior of grid cells.
        *
        * If specified, the function should take four parameters: the @see:GridPanel
        * that contains the cell, the row and column indices of the cell, and the
        * HTML element that represents the cell. The function will typically change
        * the <b>innerHTML</b> property of the cell element.
        *
        * For example:
        * <pre>
        * flex.itemFormatter = function(panel, r, c, cell) {
        *   if (panel.cellType == CellType.Cell) {
        *     // draw sparklines in the cell
        *     var col = panel.columns[c];
        *     if (col.name == 'sparklines') {
        *       cell.innerHTML = getSparklike(panel, r, c);
        *     }
        *   }
        * }
        * </pre>
        *
        * Note that the FlexGrid recycles cells, so if your @see:itemFormatter
        * modifies the cell's style attributes, you must make sure that it resets
        * these attributes for cells that should not have them. For example:
        *
        * <pre>
        * flex.itemFormatter = function(panel, r, c, cell) {
        *   // reset attributes we are about to customize
        *   var s = cell.style;
        *   s.color = '';
        *   s.backgroundColor = '';
        *   // customize color and backgroundColor attributes for this cell
        *   ...
        * }
        * </pre>
        */
        public itemFormatter : Function;
        /**
        * Gets the value stored in a cell in the scrollable area of the grid.
        *
        * @param r Row index of the cell.
        * @param c Column index of the cell.
        * @param formatted Whether to format the value for display.
        */
        public getCellData(r: number, c: number, formatted: boolean): any;
        /**
        * Sets the value of a cell in the scrollable area of the grid.
        *
        * @param r Index of the row that contains the cell.
        * @param c Index, name, or binding of the column that contains the cell.
        * @param value Value to store in the cell.
        * @param coerce Whether to change the value automatically to match the column's data type.
        * @return True if the value was stored successfully, false otherwise.
        */
        public setCellData(r: number, c: any, value: any, coerce?: boolean): boolean;
        /**
        * Gets a @see:HitTestInfo object with information about a given point.
        *
        * For example:
        *
        * <pre>
        * // hit test a point when the user clicks on the grid
        * flex.hostElement.addEventListener('click', function (e) {
        *   var ht = flex.hitTest(e.pageX, e.pageY);
        *   console.log('you clicked a cell of type "' +
        *               wijmo.grid.CellType[ht.cellType] +
        *               '".');
        * });
        * </pre>
        *
        * @param pt Point to investigate, in window coordinates, or a MoueEvent object, or x coordinate of the point.
        * @param y Y coordinate of the point (if the first parameter is a number).
        * @return HitTestInfo object with information about the point.
        */
        public hitTest(pt: any, y?: number): HitTestInfo;
        /**
        * Gets the content of a @see:CellRange as a string suitable for
        * copying to the clipboard.
        *
        * Hidden rows and columns are not included in the clip string.
        *
        * @param rng @see:CellRange to copy. If omitted, the current selection is used.
        */
        public getClipString(rng?: CellRange): string;
        /**
        * Parses a string into rows and columns and applies the content to a given range.
        *
        * Hidden rows and columns are skipped.
        *
        * @param text Tab and newline delimited text to parse into the grid.
        * @param rng @see:CellRange to copy. If omitted, the current selection is used.
        */
        public setClipString(text: string, rng?: CellRange): void;
        public _expandClipString(text: string, rng: CellRange): string;
        /**
        * Refreshes the grid display.
        *
        * @param fullUpdate Whether to update the grid layout and content, or just the content.
        */
        public refresh(fullUpdate?: boolean): void;
        /**
        * Refreshes the grid display.
        *
        * @param fullUpdate Whether to update the grid layout and content, or just the content.
        * @param recycle Whether to recycle existing elements.
        * @param cells List of @see:CellRange objects that specifies which cells must be updated.
        */
        public refreshCells(fullUpdate: boolean, recycle?: boolean, cells?: CellRange[]): void;
        /**
        * Resizes a column to fit its content.
        *
        * @param c Index of the column to resize.
        * @param header Whether the column index refers to a regular or a header row.
        * @param extra Extra spacing, in pixels.
        */
        public autoSizeColumn(c: number, header?: boolean, extra?: number): void;
        /**
        * Resizes a range of columns to fit their content.
        *
        * The grid will always measure all rows in the current view range, plus up to 2,000 rows
        * not currently in view. If the grid contains a large amount of data (say 50,000 rows),
        * then not all rows will be measured since that could potentially take a long time.
        *
        * @param firstColumn Index of the first column to resize.
        * @param lastColumn Index of the last column to resize.
        * @param header Whether the column indices refer to regular or header columns.
        * @param extra Extra spacing, in pixels.
        */
        public autoSizeColumns(firstColumn?: number, lastColumn?: number, header?: boolean, extra?: number): void;
        /**
        * Resizes a row to fit its content.
        *
        * @param r Index of the row to resize.
        * @param header Whether the row index refers to a regular or a header row.
        * @param extra Extra spacing, in pixels.
        */
        public autoSizeRow(r: number, header?: boolean, extra?: number): void;
        /**
        * Resizes a range of rows to fit their content.
        *
        * @param firstRow Index of the first row to resize.
        * @param lastRow Index of the last row to resize.
        * @param header Whether the row indices refer to regular or header rows.
        * @param extra Extra spacing, in pixels.
        */
        public autoSizeRows(firstRow?: number, lastRow?: number, header?: boolean, extra?: number): void;
        /**
        * Gets or sets the indent used to offset row groups of different levels.
        */
        public treeIndent : number;
        /**
        * Collapses all the group rows to a given level.
        *
        * @param level Maximum group level to show.
        */
        public collapseGroupsToLevel(level: number): void;
        /**
        * Gets or sets the current selection mode.
        */
        public selectionMode : SelectionMode;
        /**
        * Gets or sets the current selection.
        */
        public selection : CellRange;
        /**
        * Selects a cell range and optionally scrolls it into view.
        *
        * @param rng Range to select.
        * @param show Whether to scroll the new selection into view.
        */
        public select(rng: any, show?: any): void;
        /**
        * Gets a @see:SelectedState value that indicates the selected state of a cell.
        *
        * @param r Row index of the cell to inspect.
        * @param c Column index of the cell to inspect.
        */
        public getSelectedState(r: number, c: number): SelectedState;
        /**
        * Scrolls the grid to bring a specific cell into view.
        *
        * @param r Index of the row to scroll into view.
        * @param c Index of the column to scroll into view.
        * @return True if the grid scrolled.
        */
        public scrollIntoView(r: number, c: number): boolean;
        /**
        * Checks whether a given CellRange is valid for this grid's row and column collections.
        *
        * @param rng Range to check.
        */
        public isRangeValid(rng: CellRange): boolean;
        /**
        * Starts editing a given cell.
        *
        * Editing in the @see:FlexGrid is very similar to editing in Excel:
        * Pressing F2 or double-clicking a cell puts the grid in <b>full-edit</b> mode.
        * In this mode, the cell editor remains active until the user presses Enter, Tab,
        * or Escape, or until he moves the selection with the mouse. In full-edit mode,
        * pressing the cursor keys does not cause the grid to exit edit mode.
        *
        * Typing text directly into a cell puts the grid in <b>quick-edit mode</b>.
        * In this mode, the cell editor remains active until the user presses Enter,
        * Tab, or Escape, or any arrow keys.
        *
        * Full-edit mode is normally used to make changes to existing values.
        * Quick-edit mode is normally used for entering new data quickly.
        *
        * While editing, the user can toggle between full and quick modes by
        * pressing the F2 key.
        *
        * @param fullEdit Whether to stay in edit mode when the user presses the cursor keys. Defaults to false.
        * @param r Index of the row to be edited. Defaults to the currently selected row.
        * @param c Index of the column to be edited. Defaults to the currently selected column.
        * @return True if the edit operation started successfully.
        */
        public startEditing(fullEdit?: boolean, r?: number, c?: number): boolean;
        /**
        * Commits any pending edits and exits edit mode.
        *
        * @param cancel Whether pending edits should be canceled or committed.
        * @return True if the edit operation finished successfully.
        */
        public finishEditing(cancel?: boolean): boolean;
        /**
        * Gets the <b>HTMLInputElement</b> that represents the cell editor currently active.
        */
        public activeEditor : HTMLInputElement;
        /**
        * Gets a @see:CellRange that identifies the cell currently being edited.
        */
        public editRange : CellRange;
        /**
        * Gets or sets the @see:MergeManager object responsible for determining how cells
        * should be merged.
        */
        public mergeManager : MergeManager;
        /**
        * Gets a @see:CellRange that specifies the merged extent of a cell
        * in a @see:GridPanel.
        *
        * @param panel @see:GridPanel that contains the range.
        * @param r Index of the row that contains the cell.
        * @param c Index of the column that contains the cell.
        */
        public getMergedRange(panel: GridPanel, r: number, c: number): CellRange;
        /**
        * Occurs after the grid has been bound to a new items source.
        */
        public itemsSourceChanged: Event;
        /**
        * Raises the @see:itemsSourceChanged event.
        */
        public onItemsSourceChanged(): void;
        /**
        * Occurs after the control has scrolled.
        */
        public scrollPositionChanged: Event;
        /**
        * Raises the @see:scrollPositionChanged event.
        */
        public onScrollPositionChanged(): void;
        /**
        * Occurs before selection changes.
        */
        public selectionChanging: Event;
        /**
        * Raises the @see:selectionChanging event.
        *
        * @param e @see:CellRangeEventArgs that contains the event data.
        * @return True if the event was not canceled.
        */
        public onSelectionChanging(e: CellRangeEventArgs): boolean;
        /**
        * Occurs after selection changes.
        */
        public selectionChanged: Event;
        /**
        * Raises the @see:selectionChanged event.
        *
        * @param e @see:CellRangeEventArgs that contains the event data.
        * @return True if the event was not canceled.
        */
        public onSelectionChanged(e: CellRangeEventArgs): boolean;
        /**
        * Occurs before the grid rows are bound to the data source.
        */
        public loadingRows: Event;
        /**
        * Raises the @see:loadingRows event.
        */
        public onLoadingRows(e: CancelEventArgs): void;
        /**
        * Occurs after the grid rows have been bound to the data source.
        */
        public loadedRows: Event;
        /**
        * Raises the @see:loadedRows event.
        */
        public onLoadedRows(e: EventArgs): void;
        /**
        * Occurs as columns are resized.
        */
        public resizingColumn: Event;
        /**
        * Raises the @see:resizingColumn event.
        *
        * @param e @see:CellRangeEventArgs that contains the event data.
        * @return True if the event was not canceled.
        */
        public onResizingColumn(e: CellRangeEventArgs): boolean;
        /**
        * Occurs when the user finishes resizing columns.
        */
        public resizedColumn: Event;
        /**
        * Raises the @see:resizedColumn event.
        *
        * @param e @see:CellRangeEventArgs that contains the event data.
        */
        public onResizedColumn(e: CellRangeEventArgs): void;
        /**
        * Occurs when the user starts dragging a column.
        */
        public draggingColumn: Event;
        /**
        * Raises the @see:draggingColumn event.
        *
        * @param e @see:CellRangeEventArgs that contains the event data.
        * @return True if the event was not canceled.
        */
        public onDraggingColumn(e: CellRangeEventArgs): boolean;
        /**
        * Occurs when the user finishes dragging a column.
        */
        public draggedColumn: Event;
        /**
        * Raises the @see:draggedColumn event.
        *
        * @param e @see:CellRangeEventArgs that contains the event data.
        */
        public onDraggedColumn(e: CellRangeEventArgs): void;
        /**
        * Occurs as rows are resized.
        */
        public resizingRow: Event;
        /**
        * Raises the @see:resizingRow event.
        *
        * @param e @see:CellRangeEventArgs that contains the event data.
        * @return True if the event was not canceled.
        */
        public onResizingRow(e: CellRangeEventArgs): boolean;
        /**
        * Occurs when the user finishes resizing rows.
        */
        public resizedRow: Event;
        /**
        * Raises the @see:resizedRow event.
        *
        * @param e @see:CellRangeEventArgs that contains the event data.
        */
        public onResizedRow(e: CellRangeEventArgs): void;
        /**
        * Occurs when the user starts dragging a row.
        */
        public draggingRow: Event;
        /**
        * Raises the @see:draggingRow event.
        *
        * @param e @see:CellRangeEventArgs that contains the event data.
        * @return True if the event was not canceled.
        */
        public onDraggingRow(e: CellRangeEventArgs): boolean;
        /**
        * Occurs when the user finishes dragging a row.
        */
        public draggedRow: Event;
        /**
        * Raises the @see:draggedRow event.
        *
        * @param e @see:CellRangeEventArgs that contains the event data.
        */
        public onDraggedRow(e: CellRangeEventArgs): void;
        /**
        * Occurs when a group is about to be expanded or collapsed.
        */
        public groupCollapsedChanging: Event;
        /**
        * Raises the @see:groupCollapsedChanging event.
        *
        * @param e @see:CellRangeEventArgs that contains the event data.
        * @return True if the event was not canceled.
        */
        public onGroupCollapsedChanging(e: CellRangeEventArgs): boolean;
        /**
        * Occurs after a group has been expanded or collapsed.
        */
        public groupCollapsedChanged: Event;
        /**
        * Raises the @see:groupCollapsedChanged event.
        *
        * @param e @see:CellRangeEventArgs that contains the event data.
        */
        public onGroupCollapsedChanged(e: CellRangeEventArgs): void;
        /**
        * Occurs before the user applies a sort by clicking on a column header.
        */
        public sortingColumn: Event;
        /**
        * Raises the @see:sortingColumn event.
        *
        * @param e @see:CellRangeEventArgs that contains the event data.
        * @return True if the event was not canceled.
        */
        public onSortingColumn(e: CellRangeEventArgs): boolean;
        /**
        * Occurs after the user applies a sort by clicking on a column header.
        */
        public sortedColumn: Event;
        /**
        * Raises the @see:sortedColumn event.
        *
        * @param e @see:CellRangeEventArgs that contains the event data.
        */
        public onSortedColumn(e: CellRangeEventArgs): void;
        /**
        * Occurs before a cell enters edit mode.
        */
        public beginningEdit: Event;
        /**
        * Raises the @see:beginningEdit event.
        *
        * @param e @see:CellRangeEventArgs that contains the event data.
        * @return True if the event was not canceled.
        */
        public onBeginningEdit(e: CellRangeEventArgs): boolean;
        /**
        * Occurs when an editor cell is created and before it becomes active.
        */
        public prepareCellForEdit: Event;
        /**
        * Raises the @see:prepareCellForEdit event.
        *
        * @param e @see:CellRangeEventArgs that contains the event data.
        */
        public onPrepareCellForEdit(e: CellRangeEventArgs): void;
        /**
        * Occurs when a cell edit is ending.
        */
        public cellEditEnding: Event;
        /**
        * Raises the @see:cellEditEnding event.
        *
        * You can use this event to perform validation and prevent invalid edits.
        * For example, the code below prevents users from entering values that
        * do not contain the letter 'a'. The code demonstrates how you can obtain
        * the old and new values before the edits are applied.
        *
        * <pre>
        * function cellEditEnding (sender, e) {
        *   // get old and new values
        *   var flex = sender,
        *   oldVal = flex.getCellData(e.row, e.col),
        *   newVal = flex.activeEditor.value;
        *   // cancel edits if newVal doesn't contain 'a'
        *   e.cancel = newVal.indexOf('a') &lt; 0;
        * }
        *
        * @param e @see:CellRangeEventArgs that contains the event data.
        * @return True if the event was not canceled.
        */
        public onCellEditEnding(e: CellRangeEventArgs): boolean;
        /**
        * Occurs when a cell edit has been committed or canceled.
        */
        public cellEditEnded: Event;
        /**
        * Raises the @see:cellEditEnded event.
        *
        * @param e @see:CellRangeEventArgs that contains the event data.
        */
        public onCellEditEnded(e: CellRangeEventArgs): void;
        /**
        * Occurs when a row edit is ending, before the changes are committed or canceled.
        */
        public rowEditEnding: Event;
        /**
        * Raises the @see:rowEditEnding event.
        *
        * @param e @see:CellRangeEventArgs that contains the event data.
        */
        public onRowEditEnding(e: CellRangeEventArgs): void;
        /**
        * Occurs when a row edit has been committed or canceled.
        */
        public rowEditEnded: Event;
        /**
        * Raises the @see:rowEditEnded event.
        *
        * @param e @see:CellRangeEventArgs that contains the event data.
        */
        public onRowEditEnded(e: CellRangeEventArgs): void;
        /**
        * Occurs when the user creates a new item by editing the new row template
        * (see the @see:allowAddNew property).
        *
        * The event handler may customize the content of the new item or cancel
        * the new item creation.
        */
        public rowAdded: Event;
        /**
        * Raises the @see:rowAdded event.
        *
        * @param e @see:CellRangeEventArgs that contains the event data.
        */
        public onRowAdded(e: CellRangeEventArgs): void;
        /**
        * Occurs when the user is deleting a selected row by pressing the Delete
        * key (see the @see:allowDelete property).
        *
        * The event handler may cancel the row deletion.
        */
        public deletingRow: Event;
        /**
        * Raises the @see:deletingRow event.
        *
        * @param e @see:CellRangeEventArgs that contains the event data.
        */
        public onDeletingRow(e: CellRangeEventArgs): void;
        /**
        * Occurs when the user is copying the selection content to the
        * clipboard by pressing one of the clipboard shortcut keys
        * (see the @see:autoClipboard property).
        *
        * The event handler may cancel the copy operation.
        */
        public copying: Event;
        /**
        * Raises the @see:copying event.
        *
        * @param e @see:CellRangeEventArgs that contains the event data.
        * @return True if the event was not canceled.
        */
        public onCopying(e: CellRangeEventArgs): boolean;
        /**
        * Occurs after the user has copied the selection content to the
        * clipboard by pressing one of the clipboard shortcut keys
        * (see the @see:autoClipboard property).
        */
        public copied: Event;
        /**
        * Raises the @see:copied event.
        *
        * @param e @see:CellRangeEventArgs that contains the event data.
        */
        public onCopied(e: CellRangeEventArgs): void;
        /**
        * Occurs when the user is pasting content from the clipboard
        * by pressing one of the clipboard shortcut keys
        * (see the @see:autoClipboard property).
        *
        * The event handler may cancel the copy operation.
        */
        public pasting: Event;
        /**
        * Raises the @see:pasting event.
        *
        * @param e @see:CellRangeEventArgs that contains the event data.
        * @return True if the event was not canceled.
        */
        public onPasting(e: CellRangeEventArgs): boolean;
        /**
        * Occurs after the user has pasted content from the
        * clipboard by pressing one of the clipboard shortcut keys
        * (see the @see:autoClipboard property).
        */
        public pasted: Event;
        /**
        * Raises the @see:pasted event.
        *
        * @param e @see:CellRangeEventArgs that contains the event data.
        */
        public onPasted(e: CellRangeEventArgs): void;
        public _bindGrid(full: boolean): void;
        private _cvCollectionChanged(sender, e);
        private _cvCurrentChanged(sender, e);
        private _getRowIndex(index);
        public _getCvIndex(index: number): number;
        private _findRow(data);
        private _createChildren();
        private _updateLayout();
        private _updateContent(recycle, cells?);
        private _bindColumns();
        private _updateColumnTypes();
        private _bindRows();
        private _addGroup(g);
        private _addTreeNode(item, level);
        private static _getMaxSupportedCssHeight();
        private static _getSerializableProperties(obj);
        public _copy(key: string, value: any): boolean;
        public _hasAttribute(e: any, att: string): boolean;
    }
}

declare module wijmo.grid {
    /**
    * Provides arguments for @see:CellRange events.
    */
    class CellRangeEventArgs extends CancelEventArgs {
        public _panel: GridPanel;
        public _rng: CellRange;
        /**
        * Initializes a new instance of a @see:CellRangeEventArgs.
        *
        * @param panel @see:GridPanel that contains the range.
        * @param rng Range of cells affected by the event.
        */
        constructor(panel: GridPanel, rng: CellRange);
        /**
        * Gets the @see:GridPanel affected by this event.
        */
        public panel : GridPanel;
        /**
        * Gets the @see:CellRange affected by this event.
        */
        public cellRange : CellRange;
        /**
        * Gets the row affected by this event.
        */
        public row : number;
        /**
        * Gets the column affected by this event.
        */
        public col : number;
    }
}

declare module wijmo.grid {
    /**
    * Identifies the type of cell in a @see:GridPanel.
    */
    enum CellType {
        /** Unknown/invalid cell type. */
        None = 0,
        /** Regular data cell. */
        Cell = 1,
        /** Column header cell. */
        ColumnHeader = 2,
        /** Row header cell. */
        RowHeader = 3,
        /** Top-left cell. */
        TopLeft = 4,
    }
    /**
    * Represents a logical part of the grid, such as the column headers, row headers,
    * and scrollable data part.
    */
    class GridPanel {
        private _g;
        private _ct;
        private _e;
        private _rows;
        private _cols;
        private _rng;
        private _offsetY;
        /**
        * Initializes a new instance of a @see:GridPanel.
        *
        * @param grid @see:FlexGrid that owns this panel.
        * @param cellType Type of cell in this panel.
        * @param rows rows displayed in this panel.
        * @param cols columns displayed in this panel.
        * @param element HTMLElement that will host the cells in the control.
        */
        constructor(grid: FlexGrid, cellType: CellType, rows: RowCollection, cols: ColumnCollection, element: HTMLElement);
        /**
        * Gets the grid that owns this panel.
        */
        public grid : FlexGrid;
        /**
        * Gets the type of cell contained in this panel.
        */
        public cellType : CellType;
        /**
        * Gets a @see:CellRange that indicates the range of cells currently visible on the panel.
        */
        public viewRange : CellRange;
        /**
        * Gets the total width of the content in this panel.
        */
        public width : number;
        /**
        * Gets the total height of the content in this panel.
        */
        public height : number;
        /**
        * Gets the panel's row collection.
        */
        public rows : RowCollection;
        /**
        * Gets the panel's column collection.
        */
        public columns : ColumnCollection;
        /**
        * Gets the value stored in a cell in this panel.
        *
        * @param r Row index of the cell.
        * @param c Column index of the cell.
        * @param formatted Whether to format the value for display.
        */
        public getCellData(r: number, c: number, formatted: boolean): any;
        /**
        * Sets the content of a cell in this panel.
        *
        * @param r Index of the row that contains the cell.
        * @param c Index, name, or binding of the column that contains the cell.
        * @param value Value to store in the cell.
        * @param coerce Whether to change the value automatically to match the column's data type.
        * @return True if the value was stored successfully, false otherwise (failed cast).
        */
        public setCellData(r: number, c: any, value: any, coerce?: boolean): boolean;
        /**
        * Gets the host element for this panel.
        */
        public hostElement : HTMLElement;
        public _getOffsetY(): number;
        public _updateContent(recycle: boolean, offsetY: number, cells?: CellRange[]): void;
        public _renderRow(r: number, rng: CellRange, cells: CellRange[], ctr: number): number;
        public _renderCell(r: number, c: number, rng: CellRange, cells: CellRange[], ctr: number): number;
        public _getViewRange(buffer: boolean): CellRange;
        public _getFrozenPos(): Point;
    }
}

declare module wijmo.grid {
    /**
    * Creates HTML elements that represents cells within a @see:FlexGrid control.
    */
    class CellFactory {
        static _WJA_COLLAPSE: string;
        static _WJA_DROPDOWN: string;
        /**
        * Creates or updates a cell in the grid.
        *
        * @param panel Part of the grid that owns this cell.
        * @param r Index of this cell's row.
        * @param c Index of this cell's column.
        * @param cell Element that represents the cell.
        * @param rng @see:CellRange that contains the cell's merged range, or null if the cell is not merged.
        */
        public updateCell(panel: GridPanel, r: number, c: number, cell: HTMLElement, rng?: CellRange): void;
        private _isEditingCell(g, r, c);
        private _getGroupHeader(gr);
        private _getTreeIcon(gr);
        private _getSortIcon(col);
    }
}

declare module wijmo.grid {
    /**
    * Represents a rectangular group of cells defined by two row indices and
    * two column indices.
    */
    class CellRange {
        public _row: number;
        public _col: number;
        public _row2: number;
        public _col2: number;
        /**
        * Initializes a new instance of a @see:CellRange.
        *
        * @param r Index of the first row in this range.
        * @param c Index of the first column in this range.
        * @param r2 Index of the last row in this range.
        * @param c2 Index of the first column in this range.
        */
        constructor(r?: number, c?: number, r2?: number, c2?: number);
        /**
        * Gets or sets the index of the first row in this range.
        */
        public row : number;
        /**
        * Gets or sets the index of the first column in this range.
        */
        public col : number;
        /**
        * Gets or sets the index of the second row in this range.
        */
        public row2 : number;
        /**
        * Gets or sets the index of the second column in this range.
        */
        public col2 : number;
        /**
        * Creates a copy of this range.
        */
        public clone(): CellRange;
        /**
        * Gets the number of rows in this range.
        */
        public rowSpan : number;
        /**
        * Gets the number of columns in this range.
        */
        public columnSpan : number;
        /**
        * Gets the index of the top row in this range.
        */
        public topRow : number;
        /**
        * Gets the index of the bottom row in this range.
        */
        public bottomRow : number;
        /**
        * Gets the index of the leftmost column in this range.
        */
        public leftCol : number;
        /**
        * Gets the index of the rightmost column in this range.
        */
        public rightCol : number;
        /**
        * Checks whether this range contains valid row and column indices (> -1).
        */
        public isValid : boolean;
        /**
        * Checks whether this range corresponds to a single cell (row == row2 && col == col2).
        */
        public isSingleCell : boolean;
        /**
        * Checks whether this range contains another range or a specific cell.
        *
        * @param r CellRange or row index.
        * @param c column index (required if the r parameter is not a CellRange).
        */
        public contains(r: any, c?: number): boolean;
        /**
        * Checks whether this range contains a given row.
        *
        * @param r Index of the row to check.
        */
        public containsRow(r: number): boolean;
        /**
        * Checks whether this range contains a given column.
        *
        * @param c Index of the column to check.
        */
        public containsColumn(c: number): boolean;
        /**
        * Checks whether this range intersects another range.
        *
        * @param rng CellRange to check.
        */
        public intersects(rng: CellRange): boolean;
        /**
        * Gets the render size of this range.
        *
        * @param panel @see:GridPanel that contains the range.
        * @return A @see:Size that represents the sum of row heights and column widths in the range.
        */
        public getRenderSize(panel: GridPanel): Size;
        /**
        * Checks whether this range equals another range.
        * @param rng CellRange to compare to this range.
        */
        public equals(rng: CellRange): boolean;
    }
}

declare module wijmo.grid {
    /**
    * Flags that specify the state of a grid row or column.
    */
    enum RowColFlags {
        /** Row/Column is visible. */
        Visible = 1,
        /** Row/Column can be resized. */
        AllowResizing = 2,
        /** Row/Column can be dragged to a new position with the mouse. */
        AllowDragging = 4,
        /** Row/Column can contain merged cells. */
        AllowMerging = 8,
        /** Column can be sorted by clicking its header with the mouse. */
        AllowSorting = 16,
        /** Column was generated automatically. */
        AutoGenerated = 32,
        /** Group row is collapsed. */
        Collapsed = 64,
        /** Row has a parent group in collapsed state. */
        ParentCollapsed = 128,
        /** Row/Column is selected. */
        Selected = 256,
        /** Row/Column is read-only (cannot be edited). */
        ReadOnly = 512,
        /** Cells in this row/column contain HTML text. */
        HtmlContent = 1024,
        /** Cells in this row/column may contain wrapped text. */
        WordWrap = 2048,
        /** Default settings for new rows. */
        RowDefault,
        /** Default settings for new columns. */
        ColumnDefault,
    }
    /**
    * Abstract class that serves as a base for the @see:Row and @see:Column classes.
    */
    class RowCol {
        public _sz: number;
        public _cssClass: string;
        public _szMin: number;
        public _szMax: number;
        public _list: any;
        public _f: RowColFlags;
        public _pos: number;
        public _idx: number;
        /**
        * Gets or sets whether this row or column is visible.
        */
        public visible : boolean;
        /**
        * Gets or sets whether this row or column is visible and not collapsed.
        */
        public isVisible : boolean;
        /**
        * Gets the position of this row or column.
        */
        public pos : number;
        /**
        * Gets the index of this row or column in the parent collection.
        */
        public index : number;
        /**
        * Gets or sets the size of this row or column.
        * Setting this property to null or negative values causes the element to use the
        * parent collection's default size.
        */
        public size : number;
        /**
        * Gets the render size of this row or column.
        * This property accounts for visibility, default size, and min/max sizes.
        */
        public renderSize : number;
        /**
        * Gets or sets a whether the user can resize this row or column with the mouse.
        */
        public allowResizing : boolean;
        /**
        * Gets or sets whether the user can move this row or column to a new position with the mouse.
        */
        public allowDragging : boolean;
        /**
        * Gets or sets whether cells in this row or column can be merged.
        */
        public allowMerging : boolean;
        /**
        * Gets or sets whether this row or column is selected.
        */
        public isSelected : boolean;
        /**
        * Gets or sets whether cells in this row or column can be edited.
        */
        public isReadOnly : boolean;
        /**
        * Gets or sets whether cells in this row or column contain HTML content rather than plain text.
        */
        public isContentHtml : boolean;
        /**
        * Gets or sets whether cells in this row or column should wrap their content.
        */
        public wordWrap : boolean;
        /**
        * Gets or sets a CSS class name to be used when rendering
        * non-header cells in this row or column.
        */
        public cssClass : string;
        /**
        * Gets the FlexGrid that owns this row or column.
        */
        public grid : FlexGrid;
        /**
        * Marks the owner list as dirty and refreshes the owner grid.
        */
        public onPropertyChanged(): void;
        public _getFlag(flag: RowColFlags): boolean;
        public _setFlag(flag: RowColFlags, value: boolean): boolean;
    }
    /**
    * Represents a column on the grid.
    */
    class Column extends RowCol {
        private static _ctr;
        private _hdr;
        private _name;
        private _type;
        private _align;
        private _map;
        private _fmt;
        private _agg;
        private _inpType;
        private _mask;
        private _required;
        private _showDropDown;
        public _binding: _Binding;
        public _szStar: string;
        public _hash: string;
        /**
        * Initializes a new instance of a @see:Column.
        *
        * @param options Initialization options for the column.
        */
        constructor(options?: any);
        /**
        * Gets or sets the name of this column.
        *
        * The column name can be used to retrieve the column using the @see:getColumn method.
        */
        public name : string;
        /**
        * Gets or sets the type of value stored in this column.
        *
        * Values are coerced into the proper type when editing the grid.
        */
        public dataType : DataType;
        /**
        * Gets or sets whether values in this column are required.
        *
        * By default, this property is set to null, which means values
        * are required, but string columns may contain empty strings.
        *
        * When set to true, values are required and empty strings are
        * not allowed.
        *
        * When set to false, null values and empty strings are allowed.
        */
        public required : boolean;
        /**
        * Gets or sets whether the grid should add drop-down buttons to the
        * cells in this column.
        *
        * The drop-down buttons are shown only if the column has a @see:dataMap
        * set and is editable. Clicking on the drop-down buttons causes the grid
        * to show a list where users can select the value for the cell.
        *
        * Cell drop-downs require the wijmo.input module to be loaded.
        */
        public showDropDown : boolean;
        /**
        * Gets or sets the "type" attribute of the HTML input element used to edit values
        * in this column.
        *
        * By default, this property is set to "tel" for numeric columns, and to "text" for
        * all other non-boolean column types. The "tel" input type causes mobile devices
        * to show a numeric keyboard that includes a negative sign and a decimal separator.
        *
        * Use this property to change the default setting if the default does not work well
        * for the current culture, device, or application. In these cases, try setting the
        * property to "number" or simply "text".
        */
        public inputType : string;
        /**
        * Gets or sets a mask to be used while editing values in this column.
        *
        * The mask format is the same used by the @see:wijmo.input.InputMask
        * control.
        *
        * If specified, the mask should be compatible with the value of
        * the @see:format property. For example, the mask '99/99/9999' can
        * be used for entering dates formatted as 'MM/dd/yyyy'.
        */
        public mask : string;
        /**
        * Gets or sets the name of the property this column is bound to.
        */
        public binding : string;
        /**
        * Gets or sets the width of this column.
        *
        * Column widths may be positive numbers (column width in pixels),
        * null or negative numbers (use the collection's default column width), or
        * strings in the format '{number}*' (star sizing).
        *
        * The star-sizing option performs a XAML-style dynamic sizing where column
        * widths are proportional to the number before the star. For example, if
        * a grid has three columns with widths "100", "*", and "3*", the first column
        * will be 100 pixels wide, the second will take up 1/4th of the remaining
        * space, and the last will take up the remaining 3/4ths of the remaining space.
        *
        * Star-sizing allows you to define columns that automatically stretch to fill
        * the width available. For example, set the width of the last column to "*"
        * and it will automatically extend to fill the entire grid width so there's
        * no empty space. You may also want to set the column's @see:minWidth property
        * to prevent the column from getting too narrow.
        */
        public width : any;
        static _parseStarSize(value: any): number;
        /**
        * Gets or sets the minimum width of this column.
        */
        public minWidth : number;
        /**
        * Gets or sets the maximum width of this column.
        */
        public maxWidth : number;
        /**
        * Gets the render width of this column.
        *
        * The value returned takes into account the column's visibility, default size, and min/max sizes.
        */
        public renderWidth : number;
        /**
        * Gets or sets the horizontal alignment of items in this column.
        *
        * The default value for this property is null, which causes the grid to select
        * the alignment automatically based on column's @see:dataType (numbers are
        * right-aligned, boolean values are centered, other types are left-aligned).
        *
        * If you want to override the default alignment, set this property
        * to 'left', 'right', or 'center'.
        */
        public align : string;
        /**
        * Gets the actual column alignment.
        *
        * Returns the value of the @see:align property if that is not null, or
        * selects the alignment based on the column's @see:dataType.
        */
        public getAlignment(): string;
        /**
        * Gets or sets the text displayed in the column header.
        */
        public header : string;
        /**
        * Gets or sets the @see:DataMap used to convert raw values into display
        * values for this column.
        *
        * Columns with an associated @see:dataMap show drop-down buttons that
        * can be used for quick editing. If you don't want to show the drop-down
        * buttons, set the column's @see:showDropDown property to false.
        *
        * Cell drop-downs require the wijmo.input module to be loaded.
        */
        public dataMap : DataMap;
        /**
        * Gets or sets the format string used to convert raw values into display
        * values for this column (see @see:wijmo.Globalize).
        */
        public format : string;
        /**
        * Gets or sets whether the user can sort this column by clicking its header.
        */
        public allowSorting : boolean;
        /**
        * Gets a string that describes the current sorting applied to this column.
        * Possible values are '+' for ascending order, '-' for descending order, or
        * null for unsorted columns.
        */
        public currentSort : string;
        /**
        * Gets or sets the @see:Aggregate to display in the group header rows
        * for this column.
        */
        public aggregate : Aggregate;
    }
    /**
    * Represents a row in the grid.
    */
    class Row extends RowCol {
        private _data;
        public _ubv: any;
        /**
        * Initializes a new instance of a @see:Row.
        *
        * @param dataItem Data item that this row is bound to.
        */
        constructor(dataItem?: any);
        /**
        * Gets or sets the item in the data collection that this item is bound to.
        */
        public dataItem : any;
        /**
        * Gets or sets the height of this row.
        * Setting this property to null or negative values causes the element to use the
        * parent collection's default size.
        */
        public height : number;
        /**
        * Gets the render height of this row.
        *
        * The value returned takes into account the row's visibility, default size, and min/max sizes.
        */
        public renderHeight : number;
    }
    /**
    * Represents a row that serves as a header for a group of rows.
    */
    class GroupRow extends Row {
        public _level: number;
        /**
        * Initializes a new instance of a @see:GroupRow.
        */
        constructor();
        /**
        * Gets or sets the hierarchical level of the group associated with this GroupRow.
        */
        public level : number;
        /**
        * Gets a value that indicates whether this group row has child rows.
        */
        public hasChildren : boolean;
        /**
        * Gets or sets a value that indicates whether this GroupRow is collapsed
        * (child rows are hidden) or expanded (child rows are visible).
        */
        public isCollapsed : boolean;
        public _setCollapsed(collapsed: boolean): void;
        /**
        * Gets a CellRange object that contains all the rows in the group represented
        * by this GroupRow and all columns in the grid.
        */
        public getCellRange(): CellRange;
    }
    /**
    * Abstract class that serves as a base for row and column collections.
    */
    class RowColCollection extends collections.ObservableArray {
        public _g: FlexGrid;
        public _frozen: number;
        public _szDef: number;
        public _szTot: number;
        public _dirty: boolean;
        public _szMin: number;
        public _szMax: number;
        /**
        * Initializes a new instance of a @see:_RowColCollection.
        *
        * @param grid @see:FlexGrid that owns this collection.
        * @param defaultSize Default size of the elements in this collection.
        */
        constructor(grid: FlexGrid, defaultSize: number);
        /**
        * Gets or sets the default size of elements in this collection.
        */
        public defaultSize : number;
        /**
        * Gets or sets the number of frozen rows or columns in the collection.
        *
        * Frozen rows and columns do not scroll and remain at the top/left of
        * the grid, next to the fixed cells. Unlike fixed cells, however, frozen
        * calls may be selected and edited like regular cells.
        */
        public frozen : number;
        /**
        * Gets or sets the minimum size of elements in this collection.
        */
        public minSize : number;
        /**
        * Gets or sets the maximum size of elements in this collection.
        */
        public maxSize : number;
        /**
        * Gets the total size of the elements in this collection.
        */
        public getTotalSize(): number;
        /**
        * Gets the index of the element at a given physical position.
        * @param position Position of the item in the collection, in pixels.
        */
        public getItemAt(position: number): number;
        /**
        * Finds the next visible cell for a selection change.
        * @param index Starting index for the search.
        * @param move Type of move (size and direction).
        * @param pageSize Size of a page (in case the move is a page up/down).
        */
        public getNextCell(index: number, move: SelMove, pageSize: number): any;
        /**
        * Checks whether an element can be moved from one position to another.
        *
        * @param src Index of the element to move.
        * @param dst Position where the element should be moved to (-1 to append).
        * @return True if the move is valid, false otherwise.
        */
        public canMoveElement(src: number, dst: number): boolean;
        /**
        * Moves an element from one position to another.
        * @param src Index of the element to move.
        * @param dst Position where the element should be moved to (-1 to append).
        */
        public moveElement(src: number, dst: number): void;
        /**
        * Keeps track of dirty state and invalidate grid on changes.
        */
        public onCollectionChanged(e?: collections.NotifyCollectionChangedEventArgs): void;
        /**
        * Overridden to clear list reference from child elements.
        */
        public clear(): void;
        public _update(): boolean;
    }
    /**
    * Represents a collection of @see:Column objects in a @see:FlexGrid control.
    */
    class ColumnCollection extends RowColCollection {
        public _firstVisible: number;
        /**
        * Gets a column by name or by binding.
        *
        * The method searches the column by name. If a column with the given name
        * is not found, it searches by binding. The searches are case-sensitive.
        *
        * @param name Name or binding to look for.
        * @return The column with the specified name/binding, or null if not found.
        */
        public getColumn(name: string): Column;
        /**
        * Gets the index of a column by name or binding.
        *
        * The method searches the column by name. If a column with the given name
        * is not found, it searches by binding. The searches are case-sensitive.
        *
        * @param name Name or binding to look for.
        * @return The index of column with the specified name/binding, or -1 if not found.
        */
        public indexOf(name: string): number;
        /**
        * Gets the index of the first visible column (where the outline tree is displayed).
        */
        public firstVisibleIndex : number;
        public _update(): boolean;
        public _updateStarSizes(szAvailable: number): boolean;
    }
    /**
    * Represents a collection of @see:Row objects in a @see:FlexGrid control.
    */
    class RowCollection extends RowColCollection {
        public _maxLevel: number;
        /**
        * Gets the maximum group level in the grid.
        *
        * @return The maximum group level or -1 if the grid has no group rows.
        */
        public maxGroupLevel : number;
        public _update(): boolean;
    }
}

declare module wijmo.grid {
    /**
    * Contains information about a part of a @see:FlexGrid control at
    * a specified page coordinate.
    */
    class HitTestInfo {
        public _g: FlexGrid;
        public _p: GridPanel;
        public _pt: Point;
        public _row: number;
        public _col: number;
        public _edge: number;
        public _EDGESIZE: number;
        /**
        * Initializes a new instance of a @see:HitTestInfo.
        *
        * @param grid @see:FlexGrid control or @see:GridPanel to investigate.
        * @param pt @see:Point in page coordinates to investigate.
        */
        constructor(grid: any, pt: any);
        /**
        * Gets the point in control coordinates that this HitTestInfo refers to.
        */
        public point : Point;
        /**
        * Gets the cell type at the specified position.
        */
        public cellType : CellType;
        /**
        * Gets the grid panel at the specified position.
        */
        public gridPanel : GridPanel;
        /**
        * Gets the row index of the cell at the specified position.
        */
        public row : number;
        /**
        * Gets the column index of the cell at the specified position.
        */
        public col : number;
        /**
        * Gets the cell range at the specified position.
        */
        public cellRange : CellRange;
        /**
        * Gets whether the mouse is near the left edge of the cell.
        */
        public edgeLeft : boolean;
        /**
        * Gets whether the mouse is near the top edge of the cell.
        */
        public edgeTop : boolean;
        /**
        * Gets whether the mouse is near the right edge of the cell.
        */
        public edgeRight : boolean;
        /**
        * Gets whether the mouse is near the bottom edge of the cell.
        */
        public edgeBottom : boolean;
    }
}

declare module wijmo.grid {
    /**
    * Specifies constants that define which areas of the grid support cell merging.
    */
    enum AllowMerging {
        /** No merging. */ 
        None = 0,
        /** Merge scrollable cells. */ 
        Cells = 1,
        /** Merge column headers. */
        ColumnHeaders = 2,
        /** Merge row headers. */
        RowHeaders = 4,
        /** Merge column and row headers. */
        AllHeaders,
        /** Merge all areas. */
        All,
    }
    /**
    * Defines the @see:FlexGrid's cell merging behavior.
    *
    * An instance of this class is automatically created and assigned to
    * the grid's @see:mergeManager property to implement the grid's default
    * merging behavior.
    *
    * If you want to customize the default merging behavior, create a class
    * that derives from @see:MergeManager and override the @see:getMergedRange method.
    */
    class MergeManager {
        public _g: FlexGrid;
        /**
        * Initializes a new instance of a @see:MergeManager.
        *
        * @param grid @see:FlexGrid that owns this @see:MergeManager.
        */
        constructor(grid: FlexGrid);
        /**
        * Gets a @see:CellRange that specifies the merged extent of a cell
        * in a @see:GridPanel.
        *
        * @param panel @see:GridPanel that contains the range.
        * @param r Index of the row that contains the cell.
        * @param c Index of the column that contains the cell.
        * @return A @see:CellRange that specifies the merged range, or null if the cell is not merged.
        */
        public getMergedRange(panel: GridPanel, r: number, c: number): CellRange;
    }
}

declare module wijmo.grid {
    /**
    * Represents a data map for use with the column's @see:dataMap property.
    *
    * Data maps provide the grid with automatic look up capabilities. For example,
    * you may want to display a customer name instead of his ID, or a color name
    * instead of its RGB value.
    *
    * For example, the code below creates binds a grid to a collection of products,
    * then assigns a @see:DataMap to the grid's 'CategoryID' column so the grid will
    * display the category names rather than the raw IDs.
    *
    * <pre>
    * // bind grid to products
    * var flex = new wijmo.grid.FlexGrid();
    * flex.itemsSource = products;
    * // map CategoryID column to show category name instead of ID
    * var col = flex.columns.getColumn('CategoryID');
    * col.dataMap = new wijmo.grid.DataMap(categories, 'CategoryID', 'CategoryName');
    * </pre>
    */
    class DataMap {
        public _cv: collections.ICollectionView;
        public _keyPath: string;
        public _displayPath: string;
        /**
        * Initializes a new instance of a @see:DataMap.
        *
        * @param itemsSource Array or or @see:ICollectionView that contains the map items.
        * @param selectedValuePath Name of the property that contains the keys (data values).
        * @param displayMemberPath Name of the property to use as the visual representation of the items.
        */
        constructor(itemsSource: any, selectedValuePath: string, displayMemberPath: string);
        /**
        * Gets the @see:ICollectionView that contains the map data.
        */
        public collectionView : collections.ICollectionView;
        /**
        * Gets the name of the property to use as a key for the item (data values).
        */
        public selectedValuePath : string;
        /**
        * Gets the name of the property to use as the visual representation of the items.
        */
        public displayMemberPath : string;
        /**
        * Gets the key that corresponds to a given display value.
        *
        * @param displayValue Display value of the item to retrieve.
        */
        public getKeyValue(displayValue: string): any;
        /**
        * Gets the display value that corresponds to a given key.
        *
        * @param key Key of the item to retrieve.
        */
        public getDisplayValue(key: any): any;
        /**
        * Gets an array with all possible display values on this map.
        */
        public getDisplayValues(): string[];
        /**
        * Occurs when the map data changes.
        */
        public mapChanged: Event;
        /**
        * Raises the @see:mapChanged event.
        */
        public onMapChanged(): void;
        private _indexOf(value, path, caseSensitive);
    }
}

declare module wijmo.grid {
    /**
    * Specifies constants that define the selection behavior.
    */
    enum SelectionMode {
        /** The user cannot select cells with the mouse or keyboard. */
        None = 0,
        /** The user can select only a single cell at a time. */
        Cell = 1,
        /** The user can select contiguous blocks of cells. */
        CellRange = 2,
        /** The user can select a single row at a time. */
        Row = 3,
        /** The user can select contiguous rows. */
        RowRange = 4,
        /** The user can select non-contiguous rows. */
        ListBox = 5,
    }
    /**
    * Specifies the selected state of a cell.
    */
    enum SelectedState {
        /** The cell is not selected. */
        None = 0,
        /** The cell is selected but is not the active cell. */
        Selected = 1,
        /** The cell is selected and is the active cell. */
        Cursor = 2,
    }
    /**
    * Specifies a type of movement for the selection.
    */
    enum SelMove {
        /** Do not change the selection. */
        None = 0,
        /** Select the next visible cell. */
        Next = 1,
        /** Select the previous visible cell. */
        Prev = 2,
        /** Select the first visible cell in the next page. */
        NextPage = 3,
        /** Select the first visible cell in the previous page. */
        PrevPage = 4,
        /** Select the first visible cell. */
        Home = 5,
        /** Select the last visible cell. */
        End = 6,
        /** Select the next visible cell skipping rows if necessary. */
        NextCell = 7,
        /** Select the previous visible cell skipping rows if necessary. */
        PrevCell = 8,
    }
    /**
    * Handles the grid's selection.
    */
    class _SelectionHandler {
        public _g: FlexGrid;
        public _sel: CellRange;
        public _mode: SelectionMode;
        /**
        * Initializes a new instance of a @see:_SelectionHandler.
        *
        * @param grid @see:FlexGrid that owns this @see:_SelectionHandler.
        */
        constructor(grid: FlexGrid);
        /**
        * Gets or sets the current selection mode.
        */
        public selectionMode : SelectionMode;
        /**
        * Gets or sets the current selection.
        */
        public selection : CellRange;
        /**
        * Gets a @see:SelectedState value that indicates the selected state of a cell.
        *
        * @param r Row index of the cell to inspect.
        * @param c Column index of the cell to inspect.
        */
        public getSelectedState(r: number, c: number): SelectedState;
        /**
        * Selects a cell range and optionally scrolls it into view.
        *
        * @param rng Range to select.
        * @param show Whether to scroll the new selection into view.
        */
        public select(rng: any, show?: any): void;
        /**
        * Moves the selection by a specified amount in the vertical and horizontal directions.
        * @param rowMove How to move the row selection.
        * @param colMove How to move the column selection.
        * @param extend Whether to extend the current selection or start a new one.
        */
        public moveSelection(rowMove: SelMove, colMove: SelMove, extend: boolean): void;
        private _getReferenceCell(rowMove, colMove, extend);
        private _adjustSelection(rng);
    }
}

declare module wijmo.grid {
    /**
    * Handles the grid's keyboard commands.
    */
    class _KeyboardHandler {
        public _g: FlexGrid;
        /**
        * Initializes a new instance of a @see:_KeyboardHandler.
        *
        * @param grid @see:FlexGrid that owns this @see:_KeyboardHandler.
        */
        constructor(grid: FlexGrid);
        private _keyDown(e);
        private _keyPress(e);
        private _moveSel(rowMove, colMove, extend);
        private _deleteSel();
    }
}

declare module wijmo.grid {
    /**
    * Specifies constants that define the row/column sizing behavior.
    */
    enum AllowResizing {
        /** The user may not resize rows or columns. */
        None = 0,
        /** The user may resize columns. */
        Columns = 1,
        /** The user may resize rows. */
        Rows = 2,
        /** The user may resize rows and columns. */
        Both,
    }
    /**
    * Specifies constants that define the row/column dragging behavior.
    */
    enum AllowDragging {
        /** The user may not drag rows or columns. */
        None = 0,
        /** The user may drag columns. */
        Columns = 1,
        /** The user may drag rows. */
        Rows = 2,
        /** The user may drag rows and columns. */
        Both,
    }
    /**
    * Handles the grid's mouse commands.
    */
    class _MouseHandler {
        public _g: FlexGrid;
        public _htDown: HitTestInfo;
        public _eMouse: MouseEvent;
        public _lbSelState: boolean;
        public _lbSelRows: Object;
        public _szRowCol: RowCol;
        public _szStart: number;
        public _szArgs: CellRangeEventArgs;
        public _dragSource: any;
        /**
        * Initializes a new instance of a @see:_MouseHandler.
        *
        * @param grid @see:FlexGrid that owns this @see:_MouseHandler.
        */
        constructor(grid: FlexGrid);
        /**
        * Resets the mouse state.
        */
        public resetMouseState(): void;
        private _mouseDown(e);
        private _mouseMove(e);
        private _mouseUp(e);
        private _dblClick(e);
        private _hover(e);
        private _mouseSelect(e, extend);
        private _handleResizing(e);
        private _dragStart(e);
        private _dragEnd(e);
        private _dragOver(e);
        private _drop(e);
        private _finishResizing();
        private _startListBoxSelection(row);
        private _handleSelection(ht, extend);
        private _handleSort(e);
    }
}

declare module wijmo.grid {
    /**
    * Handles the grid's editing.
    */
    class _EditHandler {
        public _g: FlexGrid;
        public _rng: CellRange;
        public _edt: HTMLInputElement;
        public _lbx: input.ListBox;
        public _htDown: HitTestInfo;
        public _fullEdit: boolean;
        public _list: any;
        public _evtInput: any;
        /**
        * Initializes a new instance of an @see:_EditHandler.
        *
        * @param grid @see:FlexGrid that owns this @see:_EditHandler.
        */
        constructor(grid: FlexGrid);
        /**
        * Starts editing a given cell.
        *
        * @param fullEdit Whether to stay in edit mode when the user presses the cursor keys. Defaults to false.
        * @param r Index of the row to be edited. Defaults to the currently selected row.
        * @param c Index of the column to be edited. Defaults to the currently selected column.
        * @return True if the edit operation started successfully.
        */
        public startEditing(fullEdit?: boolean, r?: number, c?: number): boolean;
        public finishEditing(cancel?: boolean): boolean;
        public activeEditor : HTMLInputElement;
        public editRange : CellRange;
        public _allowEditing(r: number, c: number): boolean;
        private _commitRowEdits();
        public _keyDown(e: any): boolean;
        public _keyPress(e: any): void;
        public _toggleDropDown(ht: HitTestInfo): void;
        private _createListBox();
        private _removeListBox();
    }
}

declare module wijmo.grid {
    /**
    * Manages the new row template used to add rows to the grid.
    */
    class _AddNewHandler {
        private _g;
        private _nrt;
        /**
        * Initializes a new instance of an @see:_AddNewHandler.
        *
        * @param grid @see:FlexGrid that owns this @see:_AddNewHandler.
        */
        constructor(grid: FlexGrid);
        /**
        * Update the new row template to ensure it's visible only if the grid is bound
        * to a data source that supports adding new items, and that it is in the
        * right position.
        */
        public updateNewRowTemplate(): void;
        private _beginningEdit(sender, e);
        private _rowEditEnded(sender, e);
    }
    /**
    * Represents a row template used to add items to the source collection.
    */
    class _NewRowTemplate extends Row {
    }
}

