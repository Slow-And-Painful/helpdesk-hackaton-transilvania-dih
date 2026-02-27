import SearchInput from "$templates/components/SearchInput"
import { TableFiltersDropdownProps, TableId } from "$types/table"
import classNames from "classnames"
import TableFiltersDropdown from "./TableFiltersDropdown"

const TableFilters = ({
  tableId,
  swapOOB,
  baseUrl,
  pagination,
  additionalQueryParams,
  getSearchFieldOptions,
  side,
  class: className,
  filters
}: TableFiltersDropdownProps & TableId) => {
  return (
    <div
      id={`${tableId}-filters`}
      {...swapOOB ? { "hx-swap-oob": swapOOB } : {}}
      class={classNames("flex flex-row justify-between", className)}
    >
      <form
        id={`${tableId}-filters-form`}
        class="flex items-center gap-x-2 shrink-0"
        action={`${baseUrl}`}
        method="get"
        hx-boost="true"
        hx-target={`#${tableId}`}
        hx-headers={JSON.stringify({ "HX-Template": "table", "HX-Keep-Dropdown": true })}
        /*
          Trigger the form submission via `hx-trigger` ONLY when the search input and select change.
          Other inputs will trigger the form submission via their own `onchange` event.
          We need to update the filters count in the dropdown button, but swapping the whole form
          will make the search input lose focus when searching, resulting in bad UX.
          The `onchange` event on single inputs is used instead of `hx-trigger` here because when
          we re-process the form programmatically it won't listen to newly swapped elements changes.
          The `submit` inside `hx-trigger` here is used to "enable" the form submission via
          `htmx.trigger('form', 'submit')` inside the `onchange` event of the single inputs.
        */
        hx-trigger="submit, keyup changed delay:700ms from:input[name='search'], change from:select, reset from:input[name='search']"
      >
        
        {Object.entries(additionalQueryParams || {}).map(([key, value]) => (
          <input type="hidden" name={key} value={value} />
        ))}

        <input type="hidden" name="sorter" value={pagination.sorter} />
        <div class="min-h-8">
          <SearchInput
            name="search"
            options={getSearchFieldOptions ? getSearchFieldOptions(pagination.searchField) : undefined}
            selectName="searchField"
            placeholder={"Search..."}
            value={pagination.search}
            autofocus={pagination.autoFocus === "true" ? "true" : "false" }
          />
        </div>

        {filters?.length > 0 && <TableFiltersDropdown
          tableId={tableId}
          pagination={pagination}
          baseUrl={baseUrl}
          filters={filters}
          getSearchFieldOptions={getSearchFieldOptions}
          additionalQueryParams={additionalQueryParams}
        />}
      </form>
      {side ? side : <></>}
    </div>
  )
}

export default TableFilters