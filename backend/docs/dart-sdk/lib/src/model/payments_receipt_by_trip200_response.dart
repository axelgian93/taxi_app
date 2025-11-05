//
// AUTO-GENERATED FILE, DO NOT MODIFY!
//

// ignore_for_file: unused_element
import 'package:built_collection/built_collection.dart';
import 'package:built_value/built_value.dart';
import 'package:built_value/serializer.dart';

part 'payments_receipt_by_trip200_response.g.dart';

/// PaymentsReceiptByTrip200Response
///
/// Properties:
/// * [tripId] 
/// * [amountUsd] 
/// * [currency] 
/// * [method] 
/// * [status] 
/// * [provider] 
/// * [type] 
/// * [paidAt] 
@BuiltValue()
abstract class PaymentsReceiptByTrip200Response implements Built<PaymentsReceiptByTrip200Response, PaymentsReceiptByTrip200ResponseBuilder> {
  @BuiltValueField(wireName: r'tripId')
  String? get tripId;

  @BuiltValueField(wireName: r'amountUsd')
  num? get amountUsd;

  @BuiltValueField(wireName: r'currency')
  String? get currency;

  @BuiltValueField(wireName: r'method')
  String? get method;

  @BuiltValueField(wireName: r'status')
  String? get status;

  @BuiltValueField(wireName: r'provider')
  String? get provider;

  @BuiltValueField(wireName: r'type')
  PaymentsReceiptByTrip200ResponseTypeEnum? get type;
  // enum typeEnum {  TRIP,  CANCELLATION_FEE,  };

  @BuiltValueField(wireName: r'paidAt')
  DateTime? get paidAt;

  PaymentsReceiptByTrip200Response._();

  factory PaymentsReceiptByTrip200Response([void updates(PaymentsReceiptByTrip200ResponseBuilder b)]) = _$PaymentsReceiptByTrip200Response;

  @BuiltValueHook(initializeBuilder: true)
  static void _defaults(PaymentsReceiptByTrip200ResponseBuilder b) => b;

  @BuiltValueSerializer(custom: true)
  static Serializer<PaymentsReceiptByTrip200Response> get serializer => _$PaymentsReceiptByTrip200ResponseSerializer();
}

class _$PaymentsReceiptByTrip200ResponseSerializer implements PrimitiveSerializer<PaymentsReceiptByTrip200Response> {
  @override
  final Iterable<Type> types = const [PaymentsReceiptByTrip200Response, _$PaymentsReceiptByTrip200Response];

  @override
  final String wireName = r'PaymentsReceiptByTrip200Response';

  Iterable<Object?> _serializeProperties(
    Serializers serializers,
    PaymentsReceiptByTrip200Response object, {
    FullType specifiedType = FullType.unspecified,
  }) sync* {
    if (object.tripId != null) {
      yield r'tripId';
      yield serializers.serialize(
        object.tripId,
        specifiedType: const FullType(String),
      );
    }
    if (object.amountUsd != null) {
      yield r'amountUsd';
      yield serializers.serialize(
        object.amountUsd,
        specifiedType: const FullType(num),
      );
    }
    if (object.currency != null) {
      yield r'currency';
      yield serializers.serialize(
        object.currency,
        specifiedType: const FullType(String),
      );
    }
    if (object.method != null) {
      yield r'method';
      yield serializers.serialize(
        object.method,
        specifiedType: const FullType(String),
      );
    }
    if (object.status != null) {
      yield r'status';
      yield serializers.serialize(
        object.status,
        specifiedType: const FullType(String),
      );
    }
    if (object.provider != null) {
      yield r'provider';
      yield serializers.serialize(
        object.provider,
        specifiedType: const FullType.nullable(String),
      );
    }
    if (object.type != null) {
      yield r'type';
      yield serializers.serialize(
        object.type,
        specifiedType: const FullType(PaymentsReceiptByTrip200ResponseTypeEnum),
      );
    }
    if (object.paidAt != null) {
      yield r'paidAt';
      yield serializers.serialize(
        object.paidAt,
        specifiedType: const FullType.nullable(DateTime),
      );
    }
  }

  @override
  Object serialize(
    Serializers serializers,
    PaymentsReceiptByTrip200Response object, {
    FullType specifiedType = FullType.unspecified,
  }) {
    return _serializeProperties(serializers, object, specifiedType: specifiedType).toList();
  }

  void _deserializeProperties(
    Serializers serializers,
    Object serialized, {
    FullType specifiedType = FullType.unspecified,
    required List<Object?> serializedList,
    required PaymentsReceiptByTrip200ResponseBuilder result,
    required List<Object?> unhandled,
  }) {
    for (var i = 0; i < serializedList.length; i += 2) {
      final key = serializedList[i] as String;
      final value = serializedList[i + 1];
      switch (key) {
        case r'tripId':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(String),
          ) as String;
          result.tripId = valueDes;
          break;
        case r'amountUsd':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(num),
          ) as num;
          result.amountUsd = valueDes;
          break;
        case r'currency':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(String),
          ) as String;
          result.currency = valueDes;
          break;
        case r'method':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(String),
          ) as String;
          result.method = valueDes;
          break;
        case r'status':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(String),
          ) as String;
          result.status = valueDes;
          break;
        case r'provider':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType.nullable(String),
          ) as String?;
          if (valueDes == null) continue;
          result.provider = valueDes;
          break;
        case r'type':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(PaymentsReceiptByTrip200ResponseTypeEnum),
          ) as PaymentsReceiptByTrip200ResponseTypeEnum;
          result.type = valueDes;
          break;
        case r'paidAt':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType.nullable(DateTime),
          ) as DateTime?;
          if (valueDes == null) continue;
          result.paidAt = valueDes;
          break;
        default:
          unhandled.add(key);
          unhandled.add(value);
          break;
      }
    }
  }

  @override
  PaymentsReceiptByTrip200Response deserialize(
    Serializers serializers,
    Object serialized, {
    FullType specifiedType = FullType.unspecified,
  }) {
    final result = PaymentsReceiptByTrip200ResponseBuilder();
    final serializedList = (serialized as Iterable<Object?>).toList();
    final unhandled = <Object?>[];
    _deserializeProperties(
      serializers,
      serialized,
      specifiedType: specifiedType,
      serializedList: serializedList,
      unhandled: unhandled,
      result: result,
    );
    return result.build();
  }
}

class PaymentsReceiptByTrip200ResponseTypeEnum extends EnumClass {

  @BuiltValueEnumConst(wireName: r'TRIP')
  static const PaymentsReceiptByTrip200ResponseTypeEnum TRIP = _$paymentsReceiptByTrip200ResponseTypeEnum_TRIP;
  @BuiltValueEnumConst(wireName: r'CANCELLATION_FEE')
  static const PaymentsReceiptByTrip200ResponseTypeEnum CANCELLATION_FEE = _$paymentsReceiptByTrip200ResponseTypeEnum_CANCELLATION_FEE;

  static Serializer<PaymentsReceiptByTrip200ResponseTypeEnum> get serializer => _$paymentsReceiptByTrip200ResponseTypeEnumSerializer;

  const PaymentsReceiptByTrip200ResponseTypeEnum._(String name): super(name);

  static BuiltSet<PaymentsReceiptByTrip200ResponseTypeEnum> get values => _$paymentsReceiptByTrip200ResponseTypeEnumValues;
  static PaymentsReceiptByTrip200ResponseTypeEnum valueOf(String name) => _$paymentsReceiptByTrip200ResponseTypeEnumValueOf(name);
}

