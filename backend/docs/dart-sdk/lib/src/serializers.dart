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
import 'package:taxi_openapi/src/date_serializer.dart';
import 'package:taxi_openapi/src/model/date.dart';

import 'package:taxi_openapi/src/model/admin_diagnostics_matching200_response.dart';
import 'package:taxi_openapi/src/model/admin_diagnostics_matching200_response_env.dart';
import 'package:taxi_openapi/src/model/admin_diagnostics_matching_test200_response.dart';
import 'package:taxi_openapi/src/model/admin_diagnostics_matching_test_request.dart';
import 'package:taxi_openapi/src/model/admin_payments_report200_response.dart';
import 'package:taxi_openapi/src/model/admin_payments_report200_response_totals.dart';
import 'package:taxi_openapi/src/model/admin_payments_summary_status200_response.dart';
import 'package:taxi_openapi/src/model/admin_payments_summary_status200_response_items_inner.dart';
import 'package:taxi_openapi/src/model/admin_payments_top_drivers200_response.dart';
import 'package:taxi_openapi/src/model/admin_payments_top_drivers200_response_items_inner.dart';
import 'package:taxi_openapi/src/model/admin_payments_top_drivers200_response_totals.dart';
import 'package:taxi_openapi/src/model/admin_payments_top_riders200_response.dart';
import 'package:taxi_openapi/src/model/admin_payments_top_riders200_response_items_inner.dart';
import 'package:taxi_openapi/src/model/admin_refunds_list200_response.dart';
import 'package:taxi_openapi/src/model/admin_tariffs_create_request.dart';
import 'package:taxi_openapi/src/model/admin_tariffs_list200_response.dart';
import 'package:taxi_openapi/src/model/admin_tariffs_list200_response_items_inner.dart';
import 'package:taxi_openapi/src/model/admin_tariffs_update_by_id_request.dart';
import 'package:taxi_openapi/src/model/admin_trips_list200_response.dart';
import 'package:taxi_openapi/src/model/admin_trips_list200_response_items_inner.dart';
import 'package:taxi_openapi/src/model/auth_login_request.dart';
import 'package:taxi_openapi/src/model/auth_logout200_response.dart';
import 'package:taxi_openapi/src/model/auth_logout_request.dart';
import 'package:taxi_openapi/src/model/auth_me200_response.dart';
import 'package:taxi_openapi/src/model/auth_me200_response_user.dart';
import 'package:taxi_openapi/src/model/auth_refresh200_response.dart';
import 'package:taxi_openapi/src/model/auth_refresh_request.dart';
import 'package:taxi_openapi/src/model/auth_register201_response.dart';
import 'package:taxi_openapi/src/model/auth_register201_response_user.dart';
import 'package:taxi_openapi/src/model/auth_register400_response.dart';
import 'package:taxi_openapi/src/model/auth_register_request.dart';
import 'package:taxi_openapi/src/model/driver_my_trips_active200_response.dart';
import 'package:taxi_openapi/src/model/driver_my_trips_active200_response_items_inner.dart';
import 'package:taxi_openapi/src/model/driver_my_trips_active403_response.dart';
import 'package:taxi_openapi/src/model/driver_my_trips_history200_response.dart';
import 'package:taxi_openapi/src/model/driver_my_trips_history200_response_items_inner.dart';
import 'package:taxi_openapi/src/model/driver_update_status200_response.dart';
import 'package:taxi_openapi/src/model/driver_update_status401_response.dart';
import 'package:taxi_openapi/src/model/driver_update_status_request.dart';
import 'package:taxi_openapi/src/model/payments_capture_by_trip400_response.dart';
import 'package:taxi_openapi/src/model/payments_capture_by_trip404_response.dart';
import 'package:taxi_openapi/src/model/payments_create_setup_intent200_response.dart';
import 'package:taxi_openapi/src/model/payments_list200_response.dart';
import 'package:taxi_openapi/src/model/payments_list200_response_items_inner.dart';
import 'package:taxi_openapi/src/model/payments_receipt_by_trip200_response.dart';
import 'package:taxi_openapi/src/model/payments_refund_by_trip_request.dart';
import 'package:taxi_openapi/src/model/payments_refunds_by_trip200_response.dart';
import 'package:taxi_openapi/src/model/payments_refunds_by_trip200_response_items_inner.dart';
import 'package:taxi_openapi/src/model/payments_refunds_by_trip404_response.dart';
import 'package:taxi_openapi/src/model/payments_set_default_method_request.dart';
import 'package:taxi_openapi/src/model/rider_my_trips200_response.dart';
import 'package:taxi_openapi/src/model/rider_my_trips200_response_items_inner.dart';
import 'package:taxi_openapi/src/model/trips_accept400_response.dart';
import 'package:taxi_openapi/src/model/trips_accept404_response.dart';
import 'package:taxi_openapi/src/model/trips_accept409_response.dart';
import 'package:taxi_openapi/src/model/trips_arrived200_response.dart';
import 'package:taxi_openapi/src/model/trips_arrived409_response.dart';
import 'package:taxi_openapi/src/model/trips_cancel200_response.dart';
import 'package:taxi_openapi/src/model/trips_cancel409_response.dart';
import 'package:taxi_openapi/src/model/trips_cancel_request.dart';
import 'package:taxi_openapi/src/model/trips_complete200_response.dart';
import 'package:taxi_openapi/src/model/trips_complete409_response.dart';
import 'package:taxi_openapi/src/model/trips_driver_location200_response.dart';
import 'package:taxi_openapi/src/model/trips_request200_response.dart';
import 'package:taxi_openapi/src/model/trips_request200_response_trip.dart';
import 'package:taxi_openapi/src/model/trips_request400_response.dart';
import 'package:taxi_openapi/src/model/trips_request_request.dart';
import 'package:taxi_openapi/src/model/trips_start200_response.dart';
import 'package:taxi_openapi/src/model/trips_start409_response.dart';
import 'package:taxi_openapi/src/model/trips_start_request.dart';
import 'package:taxi_openapi/src/model/users_register_push_token_request.dart';

part 'serializers.g.dart';

@SerializersFor([
  AdminDiagnosticsMatching200Response,
  AdminDiagnosticsMatching200ResponseEnv,
  AdminDiagnosticsMatchingTest200Response,
  AdminDiagnosticsMatchingTestRequest,
  AdminPaymentsReport200Response,
  AdminPaymentsReport200ResponseTotals,
  AdminPaymentsSummaryStatus200Response,
  AdminPaymentsSummaryStatus200ResponseItemsInner,
  AdminPaymentsTopDrivers200Response,
  AdminPaymentsTopDrivers200ResponseItemsInner,
  AdminPaymentsTopDrivers200ResponseTotals,
  AdminPaymentsTopRiders200Response,
  AdminPaymentsTopRiders200ResponseItemsInner,
  AdminRefundsList200Response,
  AdminTariffsCreateRequest,
  AdminTariffsList200Response,
  AdminTariffsList200ResponseItemsInner,
  AdminTariffsUpdateByIdRequest,
  AdminTripsList200Response,
  AdminTripsList200ResponseItemsInner,
  AuthLoginRequest,
  AuthLogout200Response,
  AuthLogoutRequest,
  AuthMe200Response,
  AuthMe200ResponseUser,
  AuthRefresh200Response,
  AuthRefreshRequest,
  AuthRegister201Response,
  AuthRegister201ResponseUser,
  AuthRegister400Response,
  AuthRegisterRequest,
  DriverMyTripsActive200Response,
  DriverMyTripsActive200ResponseItemsInner,
  DriverMyTripsActive403Response,
  DriverMyTripsHistory200Response,
  DriverMyTripsHistory200ResponseItemsInner,
  DriverUpdateStatus200Response,
  DriverUpdateStatus401Response,
  DriverUpdateStatusRequest,
  PaymentsCaptureByTrip400Response,
  PaymentsCaptureByTrip404Response,
  PaymentsCreateSetupIntent200Response,
  PaymentsList200Response,
  PaymentsList200ResponseItemsInner,
  PaymentsReceiptByTrip200Response,
  PaymentsRefundByTripRequest,
  PaymentsRefundsByTrip200Response,
  PaymentsRefundsByTrip200ResponseItemsInner,
  PaymentsRefundsByTrip404Response,
  PaymentsSetDefaultMethodRequest,
  RiderMyTrips200Response,
  RiderMyTrips200ResponseItemsInner,
  TripsAccept400Response,
  TripsAccept404Response,
  TripsAccept409Response,
  TripsArrived200Response,
  TripsArrived409Response,
  TripsCancel200Response,
  TripsCancel409Response,
  TripsCancelRequest,
  TripsComplete200Response,
  TripsComplete409Response,
  TripsDriverLocation200Response,
  TripsRequest200Response,
  TripsRequest200ResponseTrip,
  TripsRequest400Response,
  TripsRequestRequest,
  TripsStart200Response,
  TripsStart409Response,
  TripsStartRequest,
  UsersRegisterPushTokenRequest,
])
Serializers serializers = (_$serializers.toBuilder()
      ..addBuilderFactory(
        const FullType(BuiltMap, [FullType(String), FullType.nullable(JsonObject)]),
        () => MapBuilder<String, JsonObject>(),
      )
      ..add(const OneOfSerializer())
      ..add(const AnyOfSerializer())
      ..add(const DateSerializer())
      ..add(Iso8601DateTimeSerializer())
    ).build();

Serializers standardSerializers =
    (serializers.toBuilder()..addPlugin(StandardJsonPlugin())).build();
