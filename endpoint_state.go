/*
 * Let staff update state
 *
 * Copyright (C) 2024  Runxi Yu <https://runxiyu.org>
 * SPDX-License-Identifier: AGPL-3.0-or-later
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

package main

import (
	"net/http"
	"strconv"
)

func handleState(w http.ResponseWriter, req *http.Request) (string, int, error) {
	_, _, department, err := getUserInfoFromRequest(req)
	if err != nil {
		return "", http.StatusUnauthorized, err
	}
	if department != staffDepartment {
		return "", http.StatusForbidden, errStaffOnly
	}

	basePath := req.PathValue("s")
	newState, err := strconv.ParseUint(basePath, 10, 32)
	if err != nil {
		return "", http.StatusBadRequest, wrapError(errInvalidState, err)
	}
	err = setState(req.Context(), uint32(newState))
	if err != nil {
		return "", http.StatusBadRequest, wrapError(errCannotSetState, err)
	}

	http.Redirect(w, req, "/", http.StatusSeeOther)
	return "", -1, nil
}
