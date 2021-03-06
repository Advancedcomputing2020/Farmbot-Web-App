import * as React from "react";
import { connect } from "react-redux";
import {
  DesignerPanel, DesignerPanelContent, DesignerPanelTop,
} from "../../farm_designer/designer_panel";
import { DesignerNavTabs, Panel } from "../../farm_designer/panel_header";
import { mapStateToProps } from "../state_to_props";
import { Props, RegimensListState } from "../interfaces";
import { t } from "../../i18next_wrapper";
import { SearchField } from "../../ui/search_field";
import { addRegimen } from "../list/add_regimen";
import { EmptyStateWrapper, EmptyStateGraphic } from "../../ui";
import { Content } from "../../constants";
import { sortResourcesById } from "../../util";
import { RegimenListItem } from "../list/regimen_list_item";

export class RawDesignerRegimenList
  extends React.Component<Props, RegimensListState> {
  state: RegimensListState = { searchTerm: "" };

  render() {
    const panelName = "designer-regimen-list";
    return <DesignerPanel panelName={panelName} panel={Panel.Regimens}>
      <DesignerNavTabs />
      <DesignerPanelTop
        panel={Panel.Regimens}
        onClick={() =>
          this.props.dispatch(addRegimen(this.props.regimens.length))}
        title={t("add new regimen")}>
        <SearchField searchTerm={this.state.searchTerm}
          placeholder={t("Search your regimens...")}
          onChange={searchTerm => this.setState({ searchTerm })} />
      </DesignerPanelTop>
      <DesignerPanelContent panelName={panelName}>
        <EmptyStateWrapper
          notEmpty={this.props.regimens.length > 0}
          graphic={EmptyStateGraphic.regimens}
          title={t("No Regimens.")}
          text={Content.NO_REGIMENS}>
          {sortResourcesById(this.props.regimens)
            .filter(regimen => regimen.body.name.toLowerCase()
              .includes(this.state.searchTerm.toLowerCase()))
            .map((regimen, index) =>
              <RegimenListItem
                key={index}
                inUse={!!this.props.regimenUsageStats[regimen.uuid]}
                regimen={regimen}
                dispatch={this.props.dispatch} />)}
        </EmptyStateWrapper>
      </DesignerPanelContent>
    </DesignerPanel>;
  }
}

export const DesignerRegimenList =
  connect(mapStateToProps)(RawDesignerRegimenList);
