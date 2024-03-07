<?php

namespace App\View\Components;

use Illuminate\View\Component;

class TableCrudAjax extends Component
{
    public $tableNumCols = 0;
    public $tableColsNames = [];

    public function __construct($numCols = [], $colsNames)
    {
        $this->tableNumCols = $numCols;
        $this->tableColsNames = $colsNames;
    }

    public function render()
    {
        return view('components.table-crud-ajax');
    }
}
