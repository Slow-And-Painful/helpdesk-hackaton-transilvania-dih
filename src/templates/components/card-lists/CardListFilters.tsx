import SearchInput from "$templates/components/SearchInput"
import { CardListFiltersDropdownProps, CardListId } from "$types/card-list"
import classNames from "classnames"
import CardListFiltersDropdown from "./CardListFiltersDropdown"

const CardListFilters = ({
  cardListId,
  swapOOB,
  baseUrl,
  additionalQueryParams,
  side,
  class: className,
  search,
  pollingProps,
  pagination,
  filters,
  getSearchFieldOptions
}: CardListFiltersDropdownProps & CardListId) => {
  return (
    <div
      id={`${cardListId}-filters`}
      {...swapOOB ? { "hx-swap-oob": swapOOB } : {}}
      class={classNames("flex flex-row justify-between", className)}
    >
      <form
        id={`${cardListId}-filters-form`}
        class="flex items-center gap-x-2 shrink-0"
        action={`${baseUrl}`}
        method="get"
        hx-boost="true"
        hx-target={`#${cardListId}`}
        hx-headers={JSON.stringify({ "HX-Template": "card-list", "HX-Keep-Dropdown": true })}
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
        {...pollingProps ? {
          ...pollingProps,
          "hx-trigger": `${pollingProps["hx-trigger"]}, submit, keyup changed delay:700ms from:input[name='search'], change from:select, reset from:input[name='search']`,
          "hx-on::before-request": `handleSwapScrollBeforeRequest("${cardListId}")`,
          "hx-on::after-request": `handleSwapScrollAfterRequest("${cardListId}")`
        } : {
          "hx-trigger": "submit, keyup changed delay:700ms from:input[name='search'], change from:select, reset from:input[name='search']"
        }}
      >
        
        {Object.entries(additionalQueryParams || {}).map(([key, value]) => (
          <input type="hidden" name={key} value={value} />
        ))}

        {/* <input type="hidden" name="sorter" value={pagination.sorter} /> */}
        <div>
          <SearchInput
            name="search"
            // options={getSearchFieldOptions ? getSearchFieldOptions(pagination.searchField) : undefined}
            selectName="searchField"
            placeholder={"Search"}
            value={pagination.search}
            autofocus={search?.autofocus === "true" ? "true" : "false" }
          />
        </div>

        {filters?.length > 0 && <CardListFiltersDropdown
          cardListId={cardListId}
          pagination={pagination}
          baseUrl={baseUrl}
          filters={filters}
          getSearchFieldOptions={getSearchFieldOptions}
        />}
      </form>
      {side ? side : <></>}
    </div>
  )
}

export default CardListFilters
