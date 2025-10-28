// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'serializers.dart';

// **************************************************************************
// BuiltValueGenerator
// **************************************************************************

Serializers _$serializers = (Serializers().toBuilder()
      ..add(AdminDiagnosticsMatching200Response.serializer)
      ..add(AdminDiagnosticsMatching200ResponseEnv.serializer)
      ..add(AdminRefundsList200Response.serializer)
      ..add(AdminTariffsCreateRequest.serializer)
      ..add(AdminTariffsList200Response.serializer)
      ..add(AdminTariffsList200ResponseItemsInner.serializer)
      ..add(AdminTariffsUpdateByIdRequest.serializer)
      ..add(AdminTripsList200Response.serializer)
      ..add(AdminTripsList200ResponseItemsInner.serializer)
      ..add(AuthLoginRequest.serializer)
      ..add(AuthMe200Response.serializer)
      ..add(AuthMe200ResponseUser.serializer)
      ..add(AuthMe200ResponseUserRoleEnum.serializer)
      ..add(AuthRegister201Response.serializer)
      ..add(AuthRegister201ResponseUser.serializer)
      ..add(AuthRegister201ResponseUserRoleEnum.serializer)
      ..add(AuthRegister400Response.serializer)
      ..add(AuthRegisterRequest.serializer)
      ..add(AuthRegisterRequestRoleEnum.serializer)
      ..add(DriverUpdateStatus200Response.serializer)
      ..add(DriverUpdateStatusRequest.serializer)
      ..add(DriverUpdateStatusRequestStatusEnum.serializer)
      ..add(PaymentsCreateSetupIntent200Response.serializer)
      ..add(PaymentsList200Response.serializer)
      ..add(PaymentsList200ResponseItemsInner.serializer)
      ..add(PaymentsList200ResponseItemsInnerStatusEnum.serializer)
      ..add(PaymentsReceiptByTrip200Response.serializer)
      ..add(PaymentsReceiptByTrip200ResponseTypeEnum.serializer)
      ..add(PaymentsRefundByTripRequest.serializer)
      ..add(PaymentsRefundsByTrip200Response.serializer)
      ..add(PaymentsRefundsByTrip200ResponseItemsInner.serializer)
      ..add(PaymentsSetDefaultMethodRequest.serializer)
      ..add(TripsCancelRequest.serializer)
      ..add(TripsRequest200Response.serializer)
      ..add(TripsRequest200ResponseTrip.serializer)
      ..add(TripsRequest200ResponseTripStatusEnum.serializer)
      ..add(TripsRequestRequest.serializer)
      ..add(UsersRegisterPushToken200Response.serializer)
      ..add(UsersRegisterPushTokenRequest.serializer)
      ..addBuilderFactory(
          const FullType(BuiltList,
              const [const FullType(AdminTariffsList200ResponseItemsInner)]),
          () => ListBuilder<AdminTariffsList200ResponseItemsInner>())
      ..addBuilderFactory(
          const FullType(BuiltList,
              const [const FullType(AdminTripsList200ResponseItemsInner)]),
          () => ListBuilder<AdminTripsList200ResponseItemsInner>())
      ..addBuilderFactory(
          const FullType(BuiltList,
              const [const FullType(PaymentsList200ResponseItemsInner)]),
          () => ListBuilder<PaymentsList200ResponseItemsInner>())
      ..addBuilderFactory(
          const FullType(BuiltList, const [
            const FullType(PaymentsRefundsByTrip200ResponseItemsInner)
          ]),
          () => ListBuilder<PaymentsRefundsByTrip200ResponseItemsInner>())
      ..addBuilderFactory(
          const FullType(BuiltList, const [
            const FullType(PaymentsRefundsByTrip200ResponseItemsInner)
          ]),
          () => ListBuilder<PaymentsRefundsByTrip200ResponseItemsInner>())
      ..addBuilderFactory(
          const FullType(
              BuiltMap, const [const FullType(String), const FullType(int)]),
          () => MapBuilder<String, int>()))
    .build();

// ignore_for_file: deprecated_member_use_from_same_package,type=lint
