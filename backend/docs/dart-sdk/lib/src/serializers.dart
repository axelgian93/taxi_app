//
// AUTO-GENERATED FILE, DO NOT MODIFY!
//

// ignore_for_file: unused_import

import 'package:one_of_serializer/any_of_serializer.dart';
import 'package:one_of_serializer/one_of_serializer.dart';
import 'package:built_collection/built_collection.dart';
import 'package:built_value/json_object.dart';
import 'package:built_value/serializer.dart';
import 'package:built_value/standard_json_plugin.dart';
import 'package:built_value/iso_8601_date_time_serializer.dart';
import 'package:openapi/src/date_serializer.dart';
import 'package:openapi/src/model/date.dart';

import 'package:openapi/src/model/admin_diagnostics_matching200_response.dart';
import 'package:openapi/src/model/admin_diagnostics_matching200_response_env.dart';
import 'package:openapi/src/model/admin_refunds_list200_response.dart';
import 'package:openapi/src/model/admin_tariffs_create_request.dart';
import 'package:openapi/src/model/admin_tariffs_list200_response.dart';
import 'package:openapi/src/model/admin_tariffs_list200_response_items_inner.dart';
import 'package:openapi/src/model/admin_tariffs_update_by_id_request.dart';
import 'package:openapi/src/model/admin_trips_list200_response.dart';
import 'package:openapi/src/model/admin_trips_list200_response_items_inner.dart';
import 'package:openapi/src/model/auth_login_request.dart';
import 'package:openapi/src/model/auth_me200_response.dart';
import 'package:openapi/src/model/auth_me200_response_user.dart';
import 'package:openapi/src/model/auth_register201_response.dart';
import 'package:openapi/src/model/auth_register201_response_user.dart';
import 'package:openapi/src/model/auth_register400_response.dart';
import 'package:openapi/src/model/auth_register_request.dart';
import 'package:openapi/src/model/driver_update_status200_response.dart';
import 'package:openapi/src/model/driver_update_status_request.dart';
import 'package:openapi/src/model/payments_create_setup_intent200_response.dart';
import 'package:openapi/src/model/payments_list200_response.dart';
import 'package:openapi/src/model/payments_list200_response_items_inner.dart';
import 'package:openapi/src/model/payments_receipt_by_trip200_response.dart';
import 'package:openapi/src/model/payments_refund_by_trip_request.dart';
import 'package:openapi/src/model/payments_refunds_by_trip200_response.dart';
import 'package:openapi/src/model/payments_refunds_by_trip200_response_items_inner.dart';
import 'package:openapi/src/model/payments_set_default_method_request.dart';
import 'package:openapi/src/model/trips_cancel_request.dart';
import 'package:openapi/src/model/trips_request200_response.dart';
import 'package:openapi/src/model/trips_request200_response_trip.dart';
import 'package:openapi/src/model/trips_request_request.dart';
import 'package:openapi/src/model/users_register_push_token200_response.dart';
import 'package:openapi/src/model/users_register_push_token_request.dart';

part 'serializers.g.dart';

@SerializersFor([
  AdminDiagnosticsMatching200Response,
  AdminDiagnosticsMatching200ResponseEnv,
  AdminRefundsList200Response,
  AdminTariffsCreateRequest,
  AdminTariffsList200Response,
  AdminTariffsList200ResponseItemsInner,
  AdminTariffsUpdateByIdRequest,
  AdminTripsList200Response,
  AdminTripsList200ResponseItemsInner,
  AuthLoginRequest,
  AuthMe200Response,
  AuthMe200ResponseUser,
  AuthRegister201Response,
  AuthRegister201ResponseUser,
  AuthRegister400Response,
  AuthRegisterRequest,
  DriverUpdateStatus200Response,
  DriverUpdateStatusRequest,
  PaymentsCreateSetupIntent200Response,
  PaymentsList200Response,
  PaymentsList200ResponseItemsInner,
  PaymentsReceiptByTrip200Response,
  PaymentsRefundByTripRequest,
  PaymentsRefundsByTrip200Response,
  PaymentsRefundsByTrip200ResponseItemsInner,
  PaymentsSetDefaultMethodRequest,
  TripsCancelRequest,
  TripsRequest200Response,
  TripsRequest200ResponseTrip,
  TripsRequestRequest,
  UsersRegisterPushToken200Response,
  UsersRegisterPushTokenRequest,
])
Serializers serializers = (_$serializers.toBuilder()
      ..add(const OneOfSerializer())
      ..add(const AnyOfSerializer())
      ..add(const DateSerializer())
      ..add(Iso8601DateTimeSerializer())
    ).build();

Serializers standardSerializers =
    (serializers.toBuilder()..addPlugin(StandardJsonPlugin())).build();
