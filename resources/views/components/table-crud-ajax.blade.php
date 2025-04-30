<div>
    <div class="table-responsive pt-4">
        <table class="table table-bordered dt-responsive table-striped w-100 class-datatable-1" id="datatable-crud-ajax">
            <thead>
            <tr>
                @foreach($tableColsNames as $tableColName)
                    @if($tableColName == 'Ações')
                        <th width="140px">{{ mb_strtoupper('Ações') }}</th>
                    @else
                        <th>{{mb_strtoupper($tableColName)}}</th>
                    @endif
                @endforeach
            </tr>
            </thead>
            <tbody></tbody>
        </table>
    </div>
</div>
